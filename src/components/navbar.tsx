'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

import Container from './container'
import Avatar from './dropdown-user'
import { ModeToggle } from './mode-toggle'
import { useAuthStore } from '~/lib/stores'
import { buttonVariants } from './ui/button'

const authPath = ['/sign-in', '/sign-up']

export default function Navbar() {
  const pathName = usePathname()
  const { user } = useAuthStore()

  return (
    <nav className="sticky inset-x-0 top-0 z-30 w-full border-b backdrop-blur-md transition-all">
      <Container className="flex h-14 items-center justify-between">
        <Link href={user ? '/main' : '/'} className="font-semibold">
          A&S Task Tracker
        </Link>
        <div className="flex items-center gap-2">
          {authPath.includes(pathName) ? null : user ? (
            <Avatar />
          ) : (
            <Link
              href={'/sign-in'}
              className={buttonVariants({
                size: 'sm',
              })}
            >
              Get started <ArrowRight className="ml-1.5 h-5 w-5" />
            </Link>
          )}
          <ModeToggle />
        </div>
      </Container>
    </nav>
  )
}
