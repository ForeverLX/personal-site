'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type IntroPhase = 'darrius' | 'transition' | 'foreverlx' | 'complete'

interface SequentialIntroProps {
  onComplete: () => void
}

export default function SequentialIntro({ onComplete }: SequentialIntroProps) {
  const [currentPhase, setCurrentPhase] = useState<IntroPhase>('darrius')
  const [showSkipButton, setShowSkipButton] = useState(false)
  const [useDramaticTransition, setUseDramaticTransition] = useState(true)
  const [fps, setFps] = useState(60)
  const [isMounted, setIsMounted] = useState(false)
  const [videoErrors, setVideoErrors] = useState<{ sunrise: boolean; sunset: boolean }>({
    sunrise: false,
    sunset: false
  })

  const darriusVideoRef = useRef<HTMLVideoElement>(null)
  const foreverlxVideoRef = useRef<HTMLVideoElement>(null)
  const fpsRef = useRef<number>(60)
  const frameCountRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(performance.now())
  
  // Stable reference to onComplete callback
  const onCompleteRef = useRef(onComplete)
  
  // Update ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Set mounted state for client-only rendering
  useEffect(() => {
    setIsMounted(true)
    
    // Check if user has already seen intro recently (within last 5 minutes)
    const lastSeen = localStorage.getItem('introLastSeen')
    const now = Date.now()
    if (lastSeen && (now - parseInt(lastSeen)) < 300000) { // 5 minutes
      console.log('🔄 Intro seen recently, skipping to main content')
      setTimeout(() => onCompleteRef.current(), 1000)
    }
  }, [])

  // Safety timeout - if intro doesn't complete within 20 seconds, force complete
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      console.log('🚨 Safety timeout reached, forcing intro completion')
      onCompleteRef.current()
    }, 20000)

    return () => clearTimeout(safetyTimeout)
  }, [])

  // Performance monitoring
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const measureFPS = () => {
      frameCountRef.current++
      const now = performance.now()
      
      if (now - lastTimeRef.current >= 1000) {
        fpsRef.current = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current))
        setFps(fpsRef.current)
        frameCountRef.current = 0
        lastTimeRef.current = now
      }
      
      requestAnimationFrame(measureFPS)
    }
    
    measureFPS()
  }, [])

  // Skip button timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkipButton(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Video playback rate control
  useEffect(() => {
    if (darriusVideoRef.current) {
      darriusVideoRef.current.playbackRate = 0.85
    }
    if (foreverlxVideoRef.current) {
      foreverlxVideoRef.current.playbackRate = 0.85
    }
  }, [currentPhase])

  // Phase timing (adjusted for slower videos)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎬 Setting up phase timers')
    }
    const timers: NodeJS.Timeout[] = []

    // DARRIUS phase: 5 seconds (slower, more cinematic)
    timers.push(setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log('⚡ Transitioning to TRANSITION phase')
      }
      setCurrentPhase('transition')
    }, 5000))

    // Transition phase: 0.7 seconds
    timers.push(setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🌇 Transitioning to FOREVERLX phase')
      }
      setCurrentPhase('foreverlx')
    }, 5700))

    // FOREVERLX phase: 5 seconds
    timers.push(setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Transitioning to COMPLETE phase')
      }
      setCurrentPhase('complete')
    }, 10700))

    // Complete: 0.5 seconds
    timers.push(setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🏁 Calling onComplete()')
      }
      onCompleteRef.current()
    }, 11200))

    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🧹 Cleaning up phase timers')
      }
      timers.forEach(clearTimeout)
    }
  }, []) // Empty dependency array - run once on mount only

  // ESC key handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCompleteRef.current()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setUseDramaticTransition(false)
    }
  }, [])

  const handleVideoError = (video: 'sunrise' | 'sunset') => {
    console.error(`❌ Video error for ${video}:`, video)
    setVideoErrors(prev => ({ ...prev, [video]: true }))
    
    // If both videos fail, skip to complete after a short delay
    setTimeout(() => {
      setVideoErrors(prev => {
        if (prev.sunrise && prev.sunset) {
          console.log('🚨 Both videos failed, skipping to complete')
          setTimeout(() => onCompleteRef.current(), 1000)
        }
        return prev
      })
    }, 2000)
  }

  const handleSkip = () => {
    // Remember skip preference
    localStorage.setItem('skipIntro', 'true')
    onCompleteRef.current()
  }

  const renderVideoMask = (text: string, id: string) => (
    <svg width="0" height="0" className="absolute">
      <defs>
        <mask id={id}>
          <rect width="100%" height="100%" fill="white" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="clamp(3rem, 8vw, 8rem)"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            fill="black"
          >
            {text}
          </text>
        </mask>
      </defs>
    </svg>
  )

  const renderPhase = (phase: IntroPhase) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎬 SequentialIntro: Rendering phase:', phase)
    }
    
    if (phase === 'darrius') {
      if (process.env.NODE_ENV === 'development') {
        console.log('🌅 Rendering DARRIUS phase - BASIC VIDEO')
      }
      return (
        <div className="absolute inset-0">
          {/* JUST the background video, nothing else */}
          <video
            ref={darriusVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            onError={() => {
              console.error('❌ Sunrise video error')
              handleVideoError('sunrise')
            }}
            onLoadedData={() => {
              console.log('🌅 Sunrise video loaded successfully')
              if (darriusVideoRef.current) {
                darriusVideoRef.current.playbackRate = 0.85
              }
            }}
          >
            <source src="/videos/sunrise.mp4" type="video/mp4" />
          </video>
          
          {/* Simple text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-8xl font-black z-10 text-center drop-shadow-2xl">
              DARRIUS GRATE
            </h1>
          </div>
        </div>
      )
    }

        if (phase === 'transition') {
          if (process.env.NODE_ENV === 'development') {
            console.log('⚡ Rendering TRANSITION phase')
          }
      return (
        <motion.div
          key="transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="absolute inset-0"
        >
          {/* Hacker-style glitch transition */}
          <div className="absolute inset-0 bg-black">
            {/* RGB chromatic aberration effect */}
            <motion.div 
              className="absolute inset-0 mix-blend-screen opacity-30"
              style={{
                background: 'linear-gradient(90deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)',
                filter: 'blur(1px)'
              }}
              animate={{ 
                x: [-3, 3, -2, 2, -1, 1, 0],
                opacity: [0.3, 0.6, 0.4, 0.7, 0.3, 0.5, 0]
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
            
            {/* Horizontal scan lines */}
            <motion.div 
              className="absolute inset-0 opacity-40"
              style={{ 
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)'
              }}
              animate={{ opacity: [0.4, 0.8, 0.4, 0.6, 0.2] }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
            
            {/* Static noise overlay */}
            <motion.div 
              className="absolute inset-0 opacity-50"
              style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")'
              }}
              animate={{ opacity: [0.3, 0.7, 0.4, 0.8, 0.2, 0.6, 0.1] }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
            
            {/* Screen shake effect */}
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                x: [0, -2, 2, -1, 1, 0],
                y: [0, 1, -1, 0.5, -0.5, 0]
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {/* Terminal-style text overlay */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-green-400 font-mono text-sm opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.3, 0.8, 0] }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <div>CONNECTION ESTABLISHED...</div>
                  <div className="text-xs mt-1">INITIALIZING PROTOCOL</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )
    }

        if (phase === 'foreverlx') {
          if (process.env.NODE_ENV === 'development') {
            console.log('🌇 Rendering FOREVERLX phase - BASIC VIDEO')
          }
      return (
        <div className="absolute inset-0">
          {/* JUST the background video, nothing else */}
          <video
            ref={foreverlxVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            onError={() => {
              console.error('❌ Sunset video error')
              handleVideoError('sunset')
            }}
            onLoadedData={() => {
              console.log('🌇 Sunset video loaded successfully')
              if (foreverlxVideoRef.current) {
                foreverlxVideoRef.current.playbackRate = 0.85
              }
            }}
          >
            <source src="/videos/sunset.mp4" type="video/mp4" />
          </video>
          
          {/* Simple text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-8xl font-black z-10 text-center drop-shadow-2xl">
              FOREVERLX
            </h1>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Performance monitor (dev only) */}
      {process.env.NODE_ENV === 'development' && isMounted && (
        <div className="absolute top-4 left-4 z-50 bg-black/50 text-white px-2 py-1 rounded text-sm">
          FPS: {fps}
        </div>
      )}

      {/* Skip button */}
      <AnimatePresence>
        {showSkipButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={handleSkip}
            className="absolute bottom-6 right-6 z-50 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 text-sm font-medium"
            aria-label="Skip intro"
          >
            Skip Intro
          </motion.button>
        )}
      </AnimatePresence>

      {/* Phase content */}
      {renderPhase(currentPhase)}
    </div>
  )
}