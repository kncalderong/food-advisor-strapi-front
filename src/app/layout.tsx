import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppApolloProvider } from '@/context/apolloClient'
import { AppProvider } from '@/context/appContext'
import Cart from '@/components/Cart/Cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Food Advisor',
  description: 'e-commerce app created with strapi and Nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppApolloProvider>
          <AppProvider>
            <Header />
            <Cart />
            {children}
          </AppProvider>
        </AppApolloProvider>
      </body>
    </html>
  )
}
