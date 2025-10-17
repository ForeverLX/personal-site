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
  title: {
    default: 'Darrius Grate | Red Team Operator & Security Researcher',
    template: '%s | Darrius Grate'
  },
  description: 'Professional red team operator and security researcher. 3 production-ready projects, 57 MITRE ATT&CK techniques covered, interactive terminal portfolio. Specializing in Active Directory security, C programming, and offensive security research.',
  keywords: [
    'red team', 'penetration testing', 'active directory', 'cybersecurity', 'security research', 
    'C programming', 'MITRE ATT&CK', 'offensive security', 'ACLGuard', 'C2 framework',
    'Linux rootkit', 'kerberoasting', 'golden ticket', 'DCSync', 'security consultant'
  ],
  authors: [{ name: 'Darrius Grate', url: 'https://darriusgrate.com' }],
  creator: 'Darrius Grate',
  publisher: 'Darrius Grate',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://darriusgrate.com',
    title: 'Darrius Grate | Red Team Operator & Security Researcher',
    description: 'Professional red team operator with 3 production projects and 57 MITRE ATT&CK techniques. Interactive terminal portfolio showcasing offensive security expertise.',
    siteName: 'Darrius Grate Portfolio',
    images: [
      {
        url: '/screenshots/homepage.png',
        width: 1200,
        height: 630,
        alt: 'Darrius Grate Red Team Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darrius Grate | Red Team Operator & Security Researcher',
    description: 'Professional red team operator with 3 production projects and 57 MITRE ATT&CK techniques. Interactive terminal portfolio showcasing offensive security expertise.',
    creator: '@DarriusGrate',
    images: ['/screenshots/homepage.png'],
  },
  verification: {
    google: 'your-google-verification-code', // Add when you have it
  },
  alternates: {
    canonical: 'https://darriusgrate.com',
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

