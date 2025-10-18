'use client'

import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface VideoSunriseSunsetProps {
  mode: 'intro' | 'hero'
  onIntroComplete?: () => void
  className?: string
}

export default function VideoSunriseSunset({ mode, onIntroComplete, className = '' }: VideoSunriseSunsetProps) {
  const [isClient, setIsClient] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)
  const sunriseVideoRef = useRef<HTMLVideoElement>(null)
  const sunsetVideoRef = useRef<HTMLVideoElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)

  // Ensure we're on the client side to prevent hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  // SVG Data URI generator for text masks with responsive sizing
  const createTextMask = (text: string) => {
    // Reduce font size for mobile devices to prevent text cutoff
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
    const fontSize = isMobile ? '100' : '140'
    
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300">
        <text 
          x="50%" 
          y="50%" 
          text-anchor="middle" 
          dominant-baseline="middle" 
          font-size="${fontSize}" 
          font-weight="900" 
          font-family="system-ui, -apple-system, sans-serif"
          fill="white"
        >${text}</text>
      </svg>
    `.trim()
    
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }
  
  // Animation controls
  const sunX = useMotionValue(0)
  const sunY = useMotionValue(0)
  const sunOpacity = useMotionValue(1)
  
  // Transform values for dynamic lighting
  const darriusBrightness = useTransform(sunX, [0, 0.5, 1], [1.2, 0.8, 0.6])
  const foreverlxBrightness = useTransform(sunX, [0, 0.5, 1], [0.6, 0.8, 1.2])
  const darriusHue = useTransform(sunX, [0, 0.5, 1], [30, 0, -30])
  const foreverlxHue = useTransform(sunX, [0, 0.5, 1], [-30, 0, 30])

  // Sun animation sequence
  useEffect(() => {
    if (!isLoaded) return

    const animateSun = async () => {
      // Start position (behind DARRIUS GRATE)
      sunX.set(0)
      sunY.set(0)
      sunOpacity.set(1)

      // Animate sun across the screen in realistic arc
      await new Promise(resolve => {
        sunX.set(1)
        sunY.set(0.1)
        setTimeout(resolve, 8000)
      })

      // Fade out at end (behind FOREVERLX)
      sunOpacity.set(0)
    }

    animateSun()
  }, [isLoaded, sunX, sunY, sunOpacity])

  // Intro screen specific logic
  useEffect(() => {
    if (mode === 'intro') {
      // Show skip button after 3 seconds
      const skipTimer = setTimeout(() => setShowSkip(true), 3000)
      
      // Auto-complete intro after 10 seconds
      const completeTimer = setTimeout(() => {
        if (onIntroComplete) onIntroComplete()
      }, 10000)

      return () => {
        clearTimeout(skipTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [mode, onIntroComplete])

  const handleVideoLoad = () => {
    setIsLoaded(true)
  }

  const handleVideoError = () => {
    setHasVideoError(true)
    setIsLoaded(true) // Still show the component with fallback
  }

  const handleSkipIntro = () => {
    if (onIntroComplete) onIntroComplete()
  }

  if (mode === 'intro') {
    return (
      <motion.div
        className={`fixed inset-0 z-50 bg-black flex items-center justify-center ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Full-screen video background */}
        <div className="absolute inset-0">
          {isClient && !hasVideoError ? (
            <video
              ref={sunriseVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
            >
              <source src="/videos/sunrise.mp4" type="video/mp4" />
            </video>
          ) : (
            /* Fallback gradient for sunrise */
            <div className="w-full h-full bg-gradient-to-br from-orange-400 via-yellow-500 to-blue-600" />
          )}
        </div>

        {/* Typography overlay with video masking */}
        <div className="relative z-10 text-center">
          <motion.div
            className="text-6xl md:text-8xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* DARRIUS GRATE with sunrise video */}
            <div className="relative inline-block mb-8">
              {isClient && !hasVideoError && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    WebkitMask: 'url(#darrius-mask)',
                    mask: 'url(#darrius-mask)',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat'
                  }}
                >
                  <source src="/videos/sunrise.mp4" type="video/mp4" />
                </video>
              )}
              <motion.span 
                className="block relative text-white"
                style={{
                  filter: `brightness(${darriusBrightness}) hue-rotate(${darriusHue}deg)`,
                  WebkitTextFillColor: hasVideoError ? 'transparent' : 'white',
                  background: hasVideoError 
                    ? 'linear-gradient(135deg, #ff6b35 0%, #f7931e 20%, #8b3a8b 40%, #ff9a9e 60%, #ffd700 80%, #ff0040 100%)'
                    : 'transparent',
                  WebkitBackgroundClip: hasVideoError ? 'text' : 'initial',
                  backgroundClip: hasVideoError ? 'text' : 'initial',
                  textShadow: '0 0 30px rgba(255, 165, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.4)',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)'
                }}
              >
                DARRIUS GRATE
              </motion.span>
            </div>
            
            {/* FOREVERLX with sunset video */}
            <div className="relative inline-block">
              {isClient && !hasVideoError && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    WebkitMask: 'url(#foreverlx-mask)',
                    mask: 'url(#foreverlx-mask)',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat'
                  }}
                >
                  <source src="/videos/sunset.mp4" type="video/mp4" />
                </video>
              )}
              <motion.span 
                className="block relative text-white"
                style={{
                  filter: `brightness(${foreverlxBrightness}) hue-rotate(${foreverlxHue}deg)`,
                  WebkitTextFillColor: hasVideoError ? 'transparent' : 'white',
                  background: hasVideoError 
                    ? 'linear-gradient(135deg, #ff0040 0%, #8b3a8b 20%, #ffd700 40%, #ff4d6d 60%, #1a1f3a 80%, #ff9a9e 100%)'
                    : 'transparent',
                  WebkitBackgroundClip: hasVideoError ? 'text' : 'initial',
                  backgroundClip: hasVideoError ? 'text' : 'initial',
                  textShadow: '0 0 30px rgba(255, 0, 100, 0.8), 0 0 60px rgba(255, 0, 100, 0.4)',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)'
                }}
              >
                FOREVERLX
              </motion.span>
            </div>
          </motion.div>
          
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Red Team Operator & Security Researcher
          </motion.p>
        </div>

        {/* SVG Masks for video text effect */}
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <mask id="darrius-mask">
              <rect width="100%" height="100%" fill="black" />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="8rem" fontFamily="Arial, sans-serif" fontWeight="bold">
                DARRIUS GRATE
              </text>
            </mask>
            <mask id="foreverlx-mask">
              <rect width="100%" height="100%" fill="black" />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="8rem" fontFamily="Arial, sans-serif" fontWeight="bold">
                FOREVERLX
              </text>
            </mask>
          </defs>
        </svg>

        {/* Traveling sun overlay */}
        <motion.div
          ref={sunRef}
          className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500"
          style={{
            x: useTransform(sunX, [0, 1], ['10%', '90%']),
            y: useTransform(sunY, [0, 1], ['50%', '40%']),
            opacity: sunOpacity,
            boxShadow: '0 0 50px rgba(255, 165, 0, 0.8), 0 0 100px rgba(255, 165, 0, 0.4)',
            filter: 'blur(1px)'
          }}
        />

        {/* Skip button */}
        {showSkip && (
          <motion.button
            onClick={handleSkipIntro}
            className="absolute top-8 right-8 px-6 py-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Skip Intro
          </motion.button>
        )}

        {/* Loading indicator */}
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
          >
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </motion.div>
        )}
      </motion.div>
    )
  }

  // Hero mode - integrated into existing hero section
  return (
    <div className={`relative ${className}`}>
      {/* Typography with video masking */}
      <div className="relative z-10">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* DARRIUS GRATE with sunrise video */}
          <div className="relative w-full text-center">
            {isClient && !hasVideoError && (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                style={{
                  WebkitMask: `url("${createTextMask('DARRIUS GRATE')}")`,
                  mask: `url("${createTextMask('DARRIUS GRATE')}")`,
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center'
                }}
              >
                <source src="/videos/sunrise.mp4" type="video/mp4" />
              </video>
            )}
            <motion.span 
              className="block relative text-4xl md:text-6xl lg:text-8xl font-bold"
              style={{
                // Hide completely when video works, show when video fails
                opacity: hasVideoError ? 1 : 0,
                pointerEvents: hasVideoError ? 'auto' : 'none',
                
                // Fallback gradient when video fails
                WebkitTextFillColor: 'transparent',
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 20%, #8b3a8b 40%, #ff9a9e 60%, #ffd700 80%, #ff0040 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(255, 165, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.4)',
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
                willChange: 'opacity, transform'
              }}
            >
              DARRIUS GRATE
            </motion.span>
          </div>
          
          {/* FOREVERLX with sunset video */}
          <div className="relative w-full text-center">
            {isClient && !hasVideoError && (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  WebkitMask: `url("${createTextMask('FOREVERLX')}")`,
                  mask: `url("${createTextMask('FOREVERLX')}")`,
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center'
                }}
              >
                <source src="/videos/sunset.mp4" type="video/mp4" />
              </video>
            )}
            <motion.span 
              className="block relative text-4xl md:text-6xl lg:text-8xl font-bold"
              style={{
                // Hide completely when video works, show when video fails
                opacity: hasVideoError ? 1 : 0,
                pointerEvents: hasVideoError ? 'auto' : 'none',
                
                // Fallback gradient when video fails
                WebkitTextFillColor: 'transparent',
                background: 'linear-gradient(135deg, #ff0040 0%, #8b3a8b 20%, #ffd700 40%, #ff4d6d 60%, #1a1f3a 80%, #ff9a9e 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(255, 0, 100, 0.8), 0 0 60px rgba(255, 0, 100, 0.4)',
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
                willChange: 'opacity, transform'
              }}
            >
              FOREVERLX
            </motion.span>
          </div>
        </motion.div>


        {/* Traveling sun overlay */}
        <motion.div
          ref={sunRef}
          className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500"
          style={{
            x: useTransform(sunX, [0, 1], ['10%', '90%']),
            y: useTransform(sunY, [0, 1], ['50%', '40%']),
            opacity: sunOpacity,
            boxShadow: '0 0 30px rgba(255, 165, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.4)',
            filter: 'blur(1px)',
            zIndex: 5
          }}
        />
      </div>
    </div>
  )
}