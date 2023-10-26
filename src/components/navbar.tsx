import Link from 'next/link'

import Container from './container'
import { ModeToggle } from './mode-toggle'

export default function Navbar() {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 w-full border-b border-gray-400 bg-[--secondary] backdrop-blur-md transition-all dark:border-gray-800">
      <Container className="flex h-14 items-center justify-between">
        <Link href={'/'} className="font-semibold">
          Task Tracker
        </Link>
        <ModeToggle />
      </Container>
    </nav>
  )
}
