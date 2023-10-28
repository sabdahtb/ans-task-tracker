import Link from 'next/link'

import Container from './container'
import { ModeToggle } from './mode-toggle'

export default function LoadingNavbar() {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 w-full border-b backdrop-blur-md transition-all">
      <Container className="flex h-14 items-center justify-between">
        <Link href={'/'} className="font-semibold">
          A&S Task Tracker
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </Container>
    </nav>
  )
}
