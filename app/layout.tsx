import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Amlan Creates',
  description: 'Created with Sweat',
  generator: 'amlan.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
