'use client'

import Link from 'next/link'

import { useAuthStore } from '~/lib/stores'
import { buttonVariants } from '~/components/ui/button'

export default function NotFound() {
  const { user } = useAuthStore()

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="font-semibold">404 | Page Not Found</h2>
      <Link
        href={user ? '/main' : '/'}
        className={buttonVariants({
          size: 'sm',
        })}
      >
        Back to Home
      </Link>
    </div>
  )
}
