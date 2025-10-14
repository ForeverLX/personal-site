import type { Metadata, Viewport } from 'next'
import './globals.css'
import SophisticatedLayout from '@/components/SophisticatedLayout'

export const metadata: Metadata = {
  title: 'Darrius Grate | Red Team Operator & Security Researcher',
  description: 'Professional consultant transitioning to red team operations. Specializing in Active Directory security, C programming, and offensive security research.',
  keywords: ['red team', 'penetration testing', 'active directory', 'cybersecurity', 'security research', 'C programming'],
  authors: [{ name: 'Darrius Grate' }],
  creator: 'Darrius Grate',
  publisher: 'Darrius Grate',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://darriusgrate.com',
    title: 'Darrius Grate | Red Team Operator & Security Researcher',
    description: 'Professional consultant transitioning to red team operations. Specializing in Active Directory security, C programming, and offensive security research.',
    siteName: 'Darrius Grate Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darrius Grate | Red Team Operator & Security Researcher',
    description: 'Professional consultant transitioning to red team operations. Specializing in Active Directory security, C programming, and offensive security research.',
    creator: '@foreverlx',
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
      <body className="antialiased">
        <SophisticatedLayout>
          {children}
        </SophisticatedLayout>
      </body>
    </html>
  )
}

