'use client'

import * as z from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'

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

const formSchema = z
  .object({
    username: z.string().min(1, {
      message: 'Please input your username',
    }),
    email: z.string().email({
      message: 'Please input a valid email.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    }
  )

export default function Page() {
  const router = useRouter()
  const signUp = trpc.auth.signup.useMutation()
  const { setUser } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    )

    const data = await signUp.mutateAsync({
      email: values.email,
      uid: response.user.uid,
      username: values.username,
    })

    setUser(data as IUser)
    router.push('/main')
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-20">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Create your account For join A&S Task Tracker
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <CardContent className="space-y-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                disabled={signUp.isLoading}
                type="submit"
                className="w-full"
              >
                {signUp.isLoading ? 'Loading...' : 'Create account'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <p className="mt-3 text-center text-xs">
        Already have an account?{' '}
        <Link className="text-primary" href={'/sign-in'}>
          Log in
        </Link>
      </p>
    </div>
  )
}
