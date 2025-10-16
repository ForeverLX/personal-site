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
      <SophisticatedNavigation />
      <main className="relative z-10">
        {children}
      </main>
      <BlueYardFooter />
    </div>
  )
}

