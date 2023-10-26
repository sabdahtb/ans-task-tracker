'use client'

import { httpBatchLink } from '@trpc/client'
import { PropsWithChildren, useState } from 'react'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { trpc } from '~/app/_trpc/client'
import { absoluteUrl } from '~/lib/utils'

export function TRPCProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: absoluteUrl('/api/trpc'),
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
