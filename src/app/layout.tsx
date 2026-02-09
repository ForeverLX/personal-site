import type { Metadata, Viewport } from 'next'
import { Cinzel, Playfair_Display, Parisienne } from 'next/font/google'
import './globals.css'
import SimpleLayout from '@/components/SimpleLayout'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair'
})

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-parisienne'
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://darriusgrate.com'),
  title: {
    default: 'Darrius Grate - Red Team Operator',
    template: '%s | Darrius Grate'
  },
  description: 'Red team portfolio focused on Active Directory security, offensive research, and tooling. Build-first journey with transparent writeups.',
  keywords: ['red team', 'offensive security', 'cybersecurity', 'security researcher', 'Active Directory', 'reverse engineering'],
  authors: [{ name: 'Darrius Grate', url: 'https://darriusgrate.com' }],
  creator: 'Darrius Grate',
  publisher: 'Darrius Grate',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://darriusgrate.com',
    title: 'Darrius Grate - Red Team Operator',
    description: 'Professional red team operator and security researcher specializing in offensive security.',
    siteName: 'Darrius Grate Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darrius Grate - Red Team Operator',
    description: 'Professional red team operator and security researcher',
    creator: '@DarriusGrate'
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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased ${cinzel.variable} ${playfair.variable} ${parisienne.variable}`}>
        <GoogleAnalytics />
        <SimpleLayout>
          {children}
        </SimpleLayout>
      </body>
    </html>
  )
}

