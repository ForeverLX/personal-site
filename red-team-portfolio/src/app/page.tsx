'use client'

import { useState, useCallback } from 'react'
import SequentialIntro from '@/components/SequentialIntro'
import HomepageVideoBackground from '@/components/HomepageVideoBackground'
import SignatureHero from '@/components/SignatureHero'
import AboutPreview from '@/components/AboutPreview'
import FeaturedProjectSpotlight from '@/components/FeaturedProjectSpotlight'
import AttackChainVisualizer from '@/components/AttackChainVisualizer'
import LiveGitHubStats from '@/components/LiveGitHubStats'
import CallToAction from '@/components/CallToAction'
import AboutSection from '@/components/AboutSection'
import ResearchSection from '@/components/ResearchSection'
import ToolsSection from '@/components/ToolsSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setShowMainContent(true)
  }, [])

  return (
    <>
      {!showMainContent && <SequentialIntro onComplete={handleIntroComplete} />}
      {showMainContent && (
        <>
          <HomepageVideoBackground />
          <SignatureHero />
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

