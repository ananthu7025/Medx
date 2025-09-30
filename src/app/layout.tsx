import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MedX - Healthcare Hiring Marketplace',
  description: 'Connect hospitals with healthcare professionals',
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