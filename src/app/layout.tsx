import './globals.css'
import { Inter } from 'next/font/google'

import Navbar from '~/components/navbar'
import Footer from '~/components/footer'
import { cn, constructMetadata } from '~/lib/utils'
import { TRPCProviders, ThemeProvider } from '~/components/providers'

const inter = Inter({ subsets: ['latin'] })
export const metadata = constructMetadata()

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
