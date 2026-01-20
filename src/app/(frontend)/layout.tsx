import React from 'react'
import './globals.css'

export const metadata = {
  description: '',
  title: "Hasnain's Portfolio",
}

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
