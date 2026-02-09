'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import VideoSunriseSunset from './VideoSunriseSunset'

interface IntroScreenProps {
  onComplete: () => void
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [showIntro, setShowIntro] = useState(true)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)

  useEffect(() => {
    // Check if user has seen intro before (session storage)
    const seenIntro = sessionStorage.getItem('hasSeenIntro')
    if (seenIntro === 'true') {
      setHasSeenIntro(true)
      setShowIntro(false)
      onComplete()
    }
  }, [onComplete])

  const handleIntroComplete = () => {
    setHasSeenIntro(true)
    sessionStorage.setItem('hasSeenIntro', 'true')
    setShowIntro(false)
    onComplete()
  }

  const handleSkipIntro = () => {
    setHasSeenIntro(true)
    sessionStorage.setItem('hasSeenIntro', 'true')
    setShowIntro(false)
    onComplete()
  }

  // Don't show intro if user has seen it before
  if (hasSeenIntro) {
    return null
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <VideoSunriseSunset
          mode="intro"
          onIntroComplete={handleIntroComplete}
          className="fixed inset-0 z-50"
        />
      )}
    </AnimatePresence>
  )
}



