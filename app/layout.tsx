import type { Metadata, Viewport } from 'next'
import { Nunito, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800']
});

const openSans = Open_Sans({ 
  subsets: ["latin"],
  variable: '--font-open-sans',
  weight: ['400', '500', '600']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kognitiam.sg'),
  title: {
    default: 'Kognitiam - Where Coffee Meets Cognition',
    template: '%s | Kognitiam'
  },
  description: 'A Singapore-born AI community built around coffee, conversation, and collective learning. Part reading group, part salon, part kopitiam for minds.',
  keywords: ['AI', 'community', 'Singapore', 'machine learning', 'coffee', 'kopitiam', 'paper reading', 'collective learning', 'artificial intelligence', 'tech community'],
  authors: [{ name: 'Kognitiam' }],
  creator: 'Kognitiam',
  publisher: 'Kognitiam',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    url: 'https://kognitiam.sg',
    siteName: 'Kognitiam',
    title: 'Kognitiam - Where Coffee Meets Cognition',
    description: 'A Singapore-born AI community built around coffee, conversation, and collective learning. Part reading group, part salon, part kopitiam for minds.',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Kognitiam - Where Coffee Meets Cognition',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kognitiam - Where Coffee Meets Cognition',
    description: 'A Singapore-born AI community built around coffee, conversation, and collective learning.',
    images: ['/images/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#6B4423',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
