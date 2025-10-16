'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomepageVideoBackground() {
  const [isClient, setIsClient] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()
  const [isIntersecting, setIsIntersecting] = useState(false)

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Intersection observer for performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const videoElement = videoRef.current
    if (videoElement) {
      observer.observe(videoElement)
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement)
      }
    }
  }, [])

  // Show controls on mouse movement (throttled for performance)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let isThrottled = false

    const handleMouseMove = () => {
      if (isThrottled) return
      
      isThrottled = true
      setShowControls(true)
      
      // Clear existing timeout
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      
      // Hide controls after 3 seconds of inactivity
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)

      // Throttle mouse move events
      timeoutId = setTimeout(() => {
        isThrottled = false
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
  }

  const handleVideoError = () => {
    setHasVideoError(true)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted
      videoRef.current.muted = newMuted
      setIsMuted(newMuted)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      if (newVolume > 0) {
        videoRef.current.muted = false
        setIsMuted(false)
      }
    }
  }

  // Return null on server-side to prevent hydration mismatch
  if (!isClient) {
    return null
  }

  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Fallback gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        style={{
          opacity: hasVideoError ? 1 : (isVideoLoaded ? 0 : 1)
        }}
      />

      {/* Video background */}
      {!hasVideoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          poster=""
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          style={{
            opacity: isVideoLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            willChange: 'opacity',
            transform: 'translateZ(0)', // Force GPU acceleration
            backfaceVisibility: 'hidden'
          }}
        >
          <source src="/videos/homepage.mp4" type="video/mp4" />
        </video>
      )}

      {/* Video controls */}
      <AnimatePresence>
        {showControls && !hasVideoError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/20"
          >
            <div className="flex items-center space-x-3">
              {/* Mute/Unmute button */}
              <button
                onClick={toggleMute}
                className="text-white hover:text-yellow-400 transition-colors duration-200"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.794L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.794a1 1 0 011.617.794zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.794L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.794a1 1 0 011.617.794zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              {/* Volume slider */}
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.794L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.794a1 1 0 011.617.794z" clipRule="evenodd" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%)`
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator */}
      {!isVideoLoaded && !hasVideoError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
            style={{
              animation: 'spin 1s linear infinite',
              willChange: 'transform'
            }}
          />
        </div>
      )}
    </div>
  )
}
