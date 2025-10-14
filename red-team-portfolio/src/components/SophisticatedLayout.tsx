'use client'

import { ReactNode } from 'react'
import SophisticatedNavigation from './SophisticatedNavigation'
import InteractiveGalaxyBackground from './InteractiveGalaxyBackground'
import BlueYardGalaxyTransition from './BlueYardGalaxyTransition'
import BlueYardFooter from './BlueYardFooter'

interface SophisticatedLayoutProps {
  children: ReactNode
}

export default function SophisticatedLayout({ children }: SophisticatedLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Interactive Galaxy Background */}
      <InteractiveGalaxyBackground />

      {/* BlueYard-Style Galaxy Transition Effect */}
      <div className="relative z-10">
        <BlueYardGalaxyTransition />
      </div>


      {/* Navigation */}
      <div className="relative z-40">
        <SophisticatedNavigation />
      </div>

      {/* Main Content */}
      <main className="relative z-30">
        {children}
      </main>

      {/* Footer */}
      <BlueYardFooter />
    </div>
  )
}
