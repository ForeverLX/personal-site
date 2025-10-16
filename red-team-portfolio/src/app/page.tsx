'use client'

import { useState, useCallback, useEffect } from 'react'
import SequentialIntro from '@/components/SequentialIntro'
import HomepageVideoBackground from '@/components/HomepageVideoBackground'
import SignatureHero from '@/components/SignatureHero'
import AboutPreview from '@/components/AboutPreview'
import FeaturedProjectSpotlight from '@/components/FeaturedProjectSpotlight'
import AttackChainVisualizer from '@/components/AttackChainVisualizer'
import LiveGitHubStats from '@/components/LiveGitHubStats'
import Terminal from '@/components/Terminal/ClientTerminal'
import CallToAction from '@/components/CallToAction'
import AboutSection from '@/components/AboutSection'
import ResearchSection from '@/components/ResearchSection'
import ToolsSection from '@/components/ToolsSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') === 'true'
    }
    return false
  })


  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('hasSeenIntro', 'true')
    setShowMainContent(true)
  }, [])

  return (
    <>
      {!showMainContent && <SequentialIntro onComplete={handleIntroComplete} />}
      {showMainContent && (
        <>
          <HomepageVideoBackground />
          <SignatureHero />
          
          {/* Interactive Terminal Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Explore <span className="text-red-500">Interactively</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Try the terminal below for an interactive tour of my work
                </p>
              </div>
              
              {/* Prominent Tour Callout */}
              <div className="mb-8 flex justify-center">
                <div className="bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-500/30 rounded-lg p-4 max-w-md">
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-2xl">🎯</span>
                    <div className="text-center">
                      <p className="text-white font-semibold text-lg">
                        New here?
                      </p>
                      <p className="text-gray-300 text-sm">
                        Type <code className="bg-gray-800 px-2 py-1 rounded text-red-400">tour</code> for a guided experience!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Terminal />
              <p className="text-center text-gray-400 mt-4 text-sm">
                <span className="text-red-400">Hint:</span> Type <code className="bg-gray-800 px-2 py-1 rounded text-red-400">help</code> to see available commands
              </p>
            </div>
          </section>
          
          <AboutPreview />
          <FeaturedProjectSpotlight />
          <AttackChainVisualizer />
          <LiveGitHubStats />
          <CallToAction />
          <AboutSection />
          <ResearchSection />
          <ToolsSection />
          <ServicesSection />
          <ContactSection />
        </>
      )}
    </>
  )
}

