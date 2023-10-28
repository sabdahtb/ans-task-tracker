import './globals.css'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'

import Footer from '~/components/footer'
import { cn, constructMetadata } from '~/lib/utils'
import LoadingNavbar from '~/components/loading-navbar'
import { ThemeProvider, TRPCProviders } from '~/components/providers'

const inter = Inter({ subsets: ['latin'] })
export const metadata = constructMetadata()

const Navbar = dynamic(() => import('~/components/navbar'), {
  ssr: false,
  loading: LoadingNavbar,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('min-h-screen font-sans antialiased', inter.className)}
      >
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <TRPCProviders>
            <main className="layout-container">
              <Navbar />
              {children}
              <Footer />
            </main>
          </TRPCProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}
