import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Regisbridge School Management System',
  description: 'Comprehensive school management platform for Regisbridge Private School',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
