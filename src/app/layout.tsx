import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hidden Maps',
  description: 'Charting what lies beneath — ideas, histories, and patterns that only reveal themselves when you know where to look.',
  metadataBase: new URL('https://hiddenmaps.app'),
  openGraph: {
    title: 'Hidden Maps',
    description: 'Charting what lies beneath',
    url: 'https://hiddenmaps.app',
    siteName: 'Hidden Maps',
  },
  icons: { icon: '/icon.svg' }
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
