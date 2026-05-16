import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: {
    default: 'The Hidden Owl',
    template: '%s — The Hidden Owl',
  },
  description: 'Observing the hidden — essays on history, culture, civilisation, and the ideas that shape the world.',
  metadataBase: new URL('https://hiddenmaps.app'),
  openGraph: {
    title: 'The Hidden Owl',
    description: 'Observing the hidden — essays on history, culture, civilisation, and the ideas that shape the world.',
    url: 'https://hiddenmaps.app',
    siteName: 'The Hidden Owl',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Hidden Owl',
    description: 'Observing the hidden — essays on history, culture, civilisation, and the ideas that shape the world.',
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
