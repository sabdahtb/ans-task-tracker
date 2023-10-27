import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Container from './container'
import { ModeToggle } from './mode-toggle'
import { buttonVariants } from './ui/button'

export default function Navbar() {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 w-full border-b backdrop-blur-md transition-all">
      <Container className="flex h-14 items-center justify-between">
        <Link href={'/'} className="font-semibold">
          A&S Task Tracker
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={'sign-in'}
            className={buttonVariants({
              size: 'sm',
            })}
          >
            Get started <ArrowRight className="ml-1.5 h-5 w-5" />
          </Link>
          <ModeToggle />
        </div>
      </Container>
    </nav>
  )
}
