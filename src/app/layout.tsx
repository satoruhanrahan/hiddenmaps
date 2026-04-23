import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}