'use client'

import * as z from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLInputTypeAttribute, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '~/components/ui/form'
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from '~/components/ui/card'
import { IUser } from '~/lib/types'
import { auth } from '~/lib/firebase'
import { trpc } from '../_trpc/client'
import { useAuthStore } from '~/lib/stores'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default function Page() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const getUser = trpc.auth.user.useMutation()

  const [passwordType, setPasswordType] =
    useState<HTMLInputTypeAttribute>('password')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    )

    const data = await getUser.mutateAsync({
      uid: response.user.uid ?? '',
    })

    setUser(data as IUser)
    router.push('/main')
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-20">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Log in with your A&S Task Tracker account
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <CardContent className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={passwordType} {...field} />
                        <div className="absolute right-0 top-0 flex h-full items-center">
                          <Button
                            type="button"
                            name="_password"
                            aria-label="_password"
                            variant="link"
                            onClick={() =>
                              setPasswordType(
                                passwordType === 'password'
                                  ? 'text'
                                  : 'password'
                              )
                            }
                          >
                            {passwordType === 'password' ? (
                              <Eye className="cursor-pointer text-secondary-foreground" />
                            ) : (
                              <EyeOff className="cursor-pointer text-secondary-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={getUser.isLoading}
              >
                {getUser.isLoading ? 'Loading...' : 'Log In'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <p className="mt-3 text-center text-xs">
        Dont have account?{' '}
        <Link className="text-primary" href={'/sign-up'}>
          Create account
        </Link>
      </p>
    </div>
  )
}
