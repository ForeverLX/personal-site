'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import VideoSunriseSunset from './VideoSunriseSunset'

export default function SignatureHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Galaxy Base Background - Brighter but still subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
      
      {/* Red/Purple Nebula Accents - Increased brightness */}
      <motion.div 
        className="absolute inset-0 opacity-35"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 30%, rgba(255, 0, 64, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(139, 58, 139, 0.3) 0%, transparent 60%)',
            'radial-gradient(ellipse at 80% 30%, rgba(255, 0, 64, 0.3) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(139, 58, 139, 0.4) 0%, transparent 60%)'
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      
      {/* Enhanced Atmospheric Lighting Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-25"
        animate={{
          background: [
            // Enhanced sunrise atmospheric glow
            'linear-gradient(to bottom, rgba(255, 107, 53, 0.15) 0%, rgba(255, 193, 7, 0.1) 25%, rgba(255, 154, 158, 0.12) 50%, rgba(255, 215, 0, 0.1) 75%, transparent 100%)',
            // Enhanced sunset atmospheric glow
            'linear-gradient(to bottom, rgba(255, 69, 0, 0.12) 0%, rgba(255, 0, 64, 0.15) 25%, rgba(139, 58, 139, 0.18) 50%, rgba(26, 31, 58, 0.2) 75%, transparent 100%)'
          ]
        }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      
      {/* Traveling Sun - Reduced brightness (50% less intense) */}
      <motion.div
        className="absolute w-40 h-40 rounded-full z-20"
        style={{
          background: 'radial-gradient(circle, #ffffff 0%, #ffd700 20%, #ff6b35 40%, #ff4500 60%, transparent 100%)',
          boxShadow: `
            0 0 50px rgba(255, 215, 0, 0.4),
            0 0 100px rgba(255, 107, 53, 0.3),
            0 0 150px rgba(255, 69, 0, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.15)
          `
        }}
        animate={{
          x: [-300, windowWidth + 300],
          y: [400, 200, 100, 200, 400], // Arc path: starts low, rises, sets low
          opacity: [0, 0.2, 0.6, 0.6, 0.2, 0], // Reduced brightness: 60% max instead of 100%
          scale: [0.4, 0.6, 0.8, 0.6, 0.4] // Smaller size
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1]
        }}
      >
        {/* Sun Corona - Reduced outer glow */}
        <motion.div
          className="absolute inset-0 w-48 h-48 rounded-full -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 200, 100, 0.025) 50%, transparent 100%)',
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.2, 1.5, 1.2, 1],
            opacity: [0.05, 0.15, 0.25, 0.15, 0.05]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Sun Surface Texture - Subtle solar flares */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)',
              'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)',
              'radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Shooting Stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full z-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(135, 206, 235, 0.6)'
          }}
          animate={{
            x: [0, 200, 400],
            y: [0, -100, -200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 2 + Math.random() * 5,
            repeatDelay: 8 + Math.random() * 7
          }}
        >
          {/* Shooting star tail */}
          <motion.div
            className="absolute w-20 h-px bg-gradient-to-r from-white to-transparent"
            style={{
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 2 + Math.random() * 5,
              repeatDelay: 8 + Math.random() * 7
            }}
          />
        </motion.div>
      ))}

      {/* Tech Elements - Removed cartoony satellite */}

      {/* Binary Code Streams */}
      <motion.div
        className="absolute inset-0 opacity-5 text-green-400 font-mono text-xs z-5"
        animate={{
          opacity: [0.02, 0.08, 0.02]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`
            }}
            animate={{
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.div>
        ))}
      </motion.div>

      {/* Data Packet Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`data-packet-${i}`}
          className="absolute w-2 h-2 bg-blue-400 rounded-sm z-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
            repeatDelay: 5 + Math.random() * 3
          }}
        />
      ))}

      {/* Atmospheric Light Rays */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255, 255, 255, 0.1) 45deg, transparent 90deg, rgba(255, 215, 0, 0.1) 135deg, transparent 180deg)',
          filter: 'blur(2px)'
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Main content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 text-center">
        {/* Dual Identity Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
          style={{ y, opacity }}
        >
          {/* Video-based Sunrise/Sunset Typography */}
          <VideoSunriseSunset mode="hero" className="w-full" />
        </motion.div>

        {/* Subtitle spanning both identities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-12"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), opacity }}
        >
          <h2 className="text-2xl lg:text-3xl font-light text-gray-300 mb-4">
            Red Team Operator | Tool Builder | AD Security Specialist
          </h2>
          <motion.p
            className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Building the Red Team Operations Toolkit
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]), opacity }}
        >
          <motion.button
            onClick={() => {
              const element = document.querySelector('#tools')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="group relative px-8 py-4 bg-red-500 text-white font-medium rounded-none border border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300 flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View Projects</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </motion.button>

          <motion.button
            onClick={() => {
              const element = document.querySelector('#research')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="group relative px-8 py-4 bg-transparent text-gray-300 font-medium rounded-none border border-gray-600 hover:border-red-500 hover:text-red-500 transition-all duration-300 flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Read Research</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 180 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </motion.svg>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}