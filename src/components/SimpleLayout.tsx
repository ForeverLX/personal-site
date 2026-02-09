'use client'

import { ReactNode } from 'react'
import SophisticatedNavigation from './SophisticatedNavigation'
import BlueYardFooter from './BlueYardFooter'

interface SimpleLayoutProps {
  children: ReactNode
}

export default function SimpleLayout({ children }: SimpleLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Skip to main content
      </a>
      
      <SophisticatedNavigation />
      <main id="main-content" className="relative z-10">
        {children}
      </main>
      <BlueYardFooter />
    </div>
  )
}

