import React from 'react'
import './globals.css'

export const metadata = {
  description: '',
  title: "Hasnain's Portfolio",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  )
}
