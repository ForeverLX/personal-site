'use client'

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function InteractiveGalaxyBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(springY, [-300, 300], [30, -30])
  const rotateY = useTransform(springX, [-300, 300], [-30, 30])

  // Scroll-based planet activation for travel effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const activePlanet = useTransform(scrollYProgress, [0, 1], [0, 5])
  
  // Make planets much more visible and prominent
  const planetOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main Galaxy Nebula - Static background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 0, 64, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(139, 58, 139, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(26, 31, 58, 0.08) 0%, transparent 70%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)
          `
        }}
      />

      {/* Static Galaxy Particles - No distracting movement */}
      <div className="absolute inset-0">
        {/* Large Red Nebula */}
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 64, 0.2) 0%, rgba(255, 0, 64, 0.05) 50%, transparent 100%)',
            top: '20%',
            left: '15%'
          }}
        />

        {/* Purple Nebula */}
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 58, 139, 0.15) 0%, rgba(139, 58, 139, 0.03) 50%, transparent 100%)',
            top: '60%',
            right: '20%'
          }}
        />

        {/* Navy Deep Space */}
        <div
          className="absolute w-72 h-72 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(26, 31, 58, 0.1) 0%, rgba(26, 31, 58, 0.02) 50%, transparent 100%)',
            top: '40%',
            left: '50%'
          }}
        />

        {/* Smaller Accent Particles */}
        <div
          className="absolute w-32 h-32 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 77, 109, 0.1) 0%, transparent 70%)',
            top: '10%',
            right: '40%'
          }}
        />

        <div
          className="absolute w-24 h-24 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(204, 0, 51, 0.08) 0%, transparent 70%)',
            bottom: '30%',
            left: '30%'
          }}
        />
      </div>

      {/* Cybersecurity-themed planets and celestial bodies */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX: useTransform(springX, [-300, 300], [10, -10]),
          rotateY: useTransform(springY, [-300, 300], [-10, 10]),
          transformStyle: 'preserve-3d',
          opacity: planetOpacity
        }}
      >
            {/* Red Sun - Main cybersecurity hub with realistic texture - EXTREMELY LARGE */}
            <motion.div
              className="absolute w-48 h-48 rounded-full relative overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                #ffffff 0%, 
                #ff6b6b 15%, 
                #ff0040 30%, 
                #cc0033 50%, 
                #8b3a8b 70%, 
                #4a1a4a 85%, 
                #2d0f2d 100%
              )
            `,
            top: '15%',
            right: '25%',
            boxShadow: `
              0 0 100px rgba(255, 0, 64, 1), 
              0 0 200px rgba(255, 0, 64, 0.7),
              0 0 300px rgba(255, 0, 64, 0.5),
              0 0 400px rgba(255, 0, 64, 0.3),
              inset -15px -15px 30px rgba(0, 0, 0, 0.4),
              inset 15px 15px 30px rgba(255, 255, 255, 0.3)
            `,
            x: useTransform(springX, [-300, 300], [5, -5]),
            y: useTransform(springY, [-300, 300], [-3, 3])
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1],
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          {/* Sun surface texture */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 25%),
              radial-gradient(circle at 80% 20%, rgba(255, 200, 100, 0.3) 0%, transparent 25%),
              radial-gradient(circle at 20% 80%, rgba(255, 150, 50, 0.3) 0%, transparent 25%),
              radial-gradient(circle at 80% 80%, rgba(255, 100, 25, 0.3) 0%, transparent 25%),
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 15%)
            `
          }} />
          {/* Solar flares */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `
              conic-gradient(from 0deg, transparent 0deg, rgba(255, 255, 255, 0.1) 45deg, transparent 90deg, rgba(255, 200, 100, 0.1) 135deg, transparent 180deg, rgba(255, 100, 25, 0.1) 225deg, transparent 270deg, rgba(255, 255, 255, 0.1) 315deg, transparent 360deg)
            `
          }} />
        </motion.div>

            {/* Planet 1: "Firewall" - Blue planet with realistic texture and security rings - EXTREMELY LARGE */}
            <motion.div
              className="absolute w-32 h-32 rounded-full relative overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                #87ceeb 0%, 
                #4a90e2 25%, 
                #2c5aa0 50%, 
                #1a3d73 75%, 
                #0f2a4a 100%
              )
            `,
            top: '25%',
            left: '20%',
            boxShadow: `
              0 0 50px rgba(74, 144, 226, 0.8),
              0 0 100px rgba(74, 144, 226, 0.5),
              0 0 150px rgba(74, 144, 226, 0.3),
              inset -8px -8px 16px rgba(0, 0, 0, 0.5),
              inset 8px 8px 16px rgba(255, 255, 255, 0.2)
            `,
            x: useTransform(springX, [-300, 300], [-8, 8]),
            y: useTransform(springY, [-300, 300], [5, -5])
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Planet surface texture - continents and oceans */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(135, 206, 235, 0.9) 0%, transparent 20%),
              radial-gradient(circle at 70% 30%, rgba(26, 61, 115, 0.8) 0%, transparent 18%),
              radial-gradient(circle at 30% 70%, rgba(15, 42, 74, 0.9) 0%, transparent 16%),
              radial-gradient(circle at 80% 80%, rgba(135, 206, 235, 0.7) 0%, transparent 14%),
              radial-gradient(circle at 50% 50%, rgba(74, 144, 226, 0.3) 0%, transparent 12%)
            `
          }} />
          {/* Atmospheric glow */}
          <div className="absolute -inset-2 rounded-full bg-blue-400/30 blur-md" />
          {/* Ocean reflections */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `
              linear-gradient(45deg, transparent 30%, rgba(135, 206, 235, 0.2) 50%, transparent 70%),
              linear-gradient(-45deg, transparent 20%, rgba(74, 144, 226, 0.1) 40%, transparent 60%)
            `
          }} />
        </motion.div>
        {/* Security rings around Firewall planet - MUCH MORE VISIBLE */}
        <motion.div
          className="absolute w-24 h-24 border-4 border-blue-400/80 rounded-full"
          style={{
            top: '20%',
            left: '17%',
            boxShadow: '0 0 30px rgba(74, 144, 226, 0.8), 0 0 60px rgba(74, 144, 226, 0.4)',
            x: useTransform(springX, [-300, 300], [-8, 8]),
            y: useTransform(springY, [-300, 300], [5, -5])
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-28 h-28 border-2 border-blue-400/60 rounded-full"
          style={{
            top: '19%',
            left: '16%',
            boxShadow: '0 0 20px rgba(74, 144, 226, 0.6)',
            x: useTransform(springX, [-300, 300], [-8, 8]),
            y: useTransform(springY, [-300, 300], [5, -5])
          }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-32 h-32 border border-blue-400/40 rounded-full"
          style={{
            top: '18%',
            left: '15%',
            x: useTransform(springX, [-300, 300], [-8, 8]),
            y: useTransform(springY, [-300, 300], [5, -5])
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

            {/* Planet 2: "Encryption" - Purple planet with realistic texture and data streams - EXTREMELY LARGE */}
            <motion.div
              className="absolute w-28 h-28 rounded-full relative overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                #dda0dd 0%, 
                #8b3a8b 25%, 
                #6b2c6b 50%, 
                #4a1a4a 75%, 
                #2d0f2d 100%
              )
            `,
            top: '45%',
            right: '15%',
            boxShadow: `
              0 0 60px rgba(139, 58, 139, 0.9),
              0 0 120px rgba(139, 58, 139, 0.6),
              0 0 180px rgba(139, 58, 139, 0.3),
              inset -10px -10px 20px rgba(0, 0, 0, 0.5),
              inset 10px 10px 20px rgba(255, 255, 255, 0.2)
            `,
            x: useTransform(springX, [-300, 300], [8, -8]),
            y: useTransform(springY, [-300, 300], [-5, 5])
          }}
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Planet surface texture - encryption patterns */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(221, 160, 221, 0.8) 0%, transparent 18%),
              radial-gradient(circle at 75% 25%, rgba(74, 26, 74, 0.9) 0%, transparent 16%),
              radial-gradient(circle at 25% 75%, rgba(45, 15, 45, 1) 0%, transparent 14%),
              radial-gradient(circle at 75% 75%, rgba(221, 160, 221, 0.6) 0%, transparent 12%),
              linear-gradient(45deg, transparent 35%, rgba(139, 58, 139, 0.4) 50%, transparent 65%),
              linear-gradient(-45deg, transparent 25%, rgba(221, 160, 221, 0.2) 40%, transparent 55%)
            `
          }} />
          {/* Atmospheric glow */}
          <div className="absolute -inset-2 rounded-full bg-purple-400/30 blur-md" />
          {/* Encryption data streams */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `
              conic-gradient(from 0deg, transparent 0deg, rgba(139, 58, 139, 0.1) 30deg, transparent 60deg, rgba(221, 160, 221, 0.1) 90deg, transparent 120deg, rgba(139, 58, 139, 0.1) 150deg, transparent 180deg, rgba(221, 160, 221, 0.1) 210deg, transparent 240deg, rgba(139, 58, 139, 0.1) 270deg, transparent 300deg, rgba(221, 160, 221, 0.1) 330deg, transparent 360deg)
            `
          }} />
        </motion.div>
        {/* Data streams around Encryption planet - MUCH MORE VISIBLE */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-purple-400 rounded-full"
            style={{
              top: `${45 + (i * 1)}%`,
              right: `${15 + (i * 1.5)}%`,
              boxShadow: '0 0 12px rgba(139, 58, 139, 1), 0 0 24px rgba(139, 58, 139, 0.6)',
              x: useTransform(springX, [-300, 300], [8, -8]),
              y: useTransform(springY, [-300, 300], [-5, 5])
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2
            }}
          />
        ))}
        {/* Data stream lines - MUCH MORE VISIBLE */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute w-12 h-1 bg-purple-400/80"
            style={{
              top: `${45 + (i * 1.5)}%`,
              right: `${25 + (i * 1.5)}%`,
              transform: `rotate(${i * 20}deg)`,
              boxShadow: '0 0 8px rgba(139, 58, 139, 0.8)',
              x: useTransform(springX, [-300, 300], [8, -8]),
              y: useTransform(springY, [-300, 300], [-5, 5])
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3
            }}
          />
        ))}

        {/* Planet 3: "Penetration" - Red planet with realistic texture and attack vectors - EXTREMELY LARGE */}
        <motion.div
          className="absolute w-24 h-24 rounded-full relative overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                #ffb3ba 0%, 
                #ff4d6d 25%, 
                #ff0040 50%, 
                #cc0033 75%, 
                #990022 100%
              )
            `,
            top: '65%',
            left: '35%',
            boxShadow: `
              0 0 25px rgba(255, 77, 109, 0.6),
              0 0 50px rgba(255, 77, 109, 0.3),
              inset -4px -4px 8px rgba(0, 0, 0, 0.4),
              inset 4px 4px 8px rgba(255, 255, 255, 0.1)
            `,
            x: useTransform(springX, [-300, 300], [-12, 12]),
            y: useTransform(springY, [-300, 300], [8, -8])
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Planet surface texture - attack patterns */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(255, 179, 186, 0.7) 0%, transparent 10%),
              radial-gradient(circle at 80% 20%, rgba(153, 0, 34, 0.8) 0%, transparent 8%),
              radial-gradient(circle at 20% 80%, rgba(204, 0, 51, 0.6) 0%, transparent 6%),
              radial-gradient(circle at 80% 80%, rgba(255, 77, 109, 0.5) 0%, transparent 5%),
              linear-gradient(30deg, transparent 35%, rgba(255, 0, 64, 0.4) 45%, transparent 55%)
            `
          }} />
          {/* Atmospheric glow */}
          <div className="absolute -inset-1 rounded-full bg-red-400/20 blur-sm" />
        </motion.div>
        {/* Attack vector lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-12 bg-red-400/60"
            style={{
              top: `${65 + (i * 0.8)}%`,
              left: `${35 + (i * 0.3)}%`,
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: 'bottom',
              boxShadow: '0 0 6px rgba(255, 0, 64, 0.6)',
              x: useTransform(springX, [-300, 300], [-12, 12]),
              y: useTransform(springY, [-300, 300], [8, -8])
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1.2, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2
            }}
          />
        ))}
        {/* Attack vector particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-red-400 rounded-full"
            style={{
              top: `${65 + (Math.sin(i) * 3)}%`,
              left: `${35 + (Math.cos(i) * 3)}%`,
              boxShadow: '0 0 4px rgba(255, 0, 64, 0.8)',
              x: useTransform(springX, [-300, 300], [-12, 12]),
              y: useTransform(springY, [-300, 300], [8, -8])
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15
            }}
          />
        ))}

        {/* Planet 4: "Defense" - Green planet with realistic texture and shield effects - EXTREMELY LARGE */}
        <motion.div
          className="absolute w-20 h-20 rounded-full relative overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                #90ee90 0%, 
                #4ade80 25%, 
                #22c55e 50%, 
                #16a34a 75%, 
                #0d6b2a 100%
              )
            `,
            top: '35%',
            left: '60%',
            boxShadow: `
              0 0 30px rgba(74, 222, 128, 0.6),
              0 0 60px rgba(74, 222, 128, 0.3),
              inset -5px -5px 10px rgba(0, 0, 0, 0.4),
              inset 5px 5px 10px rgba(255, 255, 255, 0.1)
            `,
            x: useTransform(springX, [-300, 300], [14, -14]),
            y: useTransform(springY, [-300, 300], [-9, 9])
          }}
          animate={{
            x: [0, -15, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Planet surface texture - defense patterns */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(144, 238, 144, 0.7) 0%, transparent 12%),
              radial-gradient(circle at 75% 25%, rgba(13, 107, 42, 0.8) 0%, transparent 10%),
              radial-gradient(circle at 25% 75%, rgba(22, 197, 94, 0.6) 0%, transparent 8%),
              radial-gradient(circle at 75% 75%, rgba(144, 238, 144, 0.5) 0%, transparent 6%),
              linear-gradient(60deg, transparent 30%, rgba(74, 222, 128, 0.4) 40%, transparent 50%)
            `
          }} />
          {/* Atmospheric glow */}
          <div className="absolute -inset-1 rounded-full bg-green-400/20 blur-sm" />
        </motion.div>
        {/* Shield effect around Defense planet */}
        <motion.div
          className="absolute w-14 h-14 border-2 border-green-400/60 rounded-full"
          style={{
            top: '32%',
            left: '57%',
            boxShadow: '0 0 15px rgba(74, 222, 128, 0.5)',
            x: useTransform(springX, [-300, 300], [14, -14]),
            y: useTransform(springY, [-300, 300], [-9, 9])
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-18 h-18 border border-green-400/40 rounded-full"
          style={{
            top: '30%',
            left: '55%',
            x: useTransform(springX, [-300, 300], [14, -14]),
            y: useTransform(springY, [-300, 300], [-9, 9])
          }}
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Planet 5: "Malware" - Dark planet with realistic texture and corruption effects - EXTREMELY LARGE */}
        <motion.div
          className="absolute w-18 h-18 rounded-full relative overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                #4a5568 0%, 
                #2d3748 25%, 
                #1f2937 50%, 
                #111827 75%, 
                #000000 100%
              )
            `,
            top: '55%',
            left: '75%',
            boxShadow: `
              0 0 20px rgba(31, 41, 55, 0.8),
              0 0 40px rgba(31, 41, 55, 0.4),
              inset -3px -3px 6px rgba(0, 0, 0, 0.6),
              inset 3px 3px 6px rgba(255, 255, 255, 0.05)
            `,
            x: useTransform(springX, [-300, 300], [10, -10]),
            y: useTransform(springY, [-300, 300], [6, -6])
          }}
          animate={{
            x: [0, 18, 0],
            y: [0, -12, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Planet surface texture - corruption patterns */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(74, 85, 104, 0.6) 0%, transparent 10%),
              radial-gradient(circle at 80% 20%, rgba(0, 0, 0, 0.8) 0%, transparent 8%),
              radial-gradient(circle at 20% 80%, rgba(31, 41, 55, 0.7) 0%, transparent 6%),
              radial-gradient(circle at 80% 80%, rgba(74, 85, 104, 0.4) 0%, transparent 5%),
              linear-gradient(45deg, transparent 30%, rgba(31, 41, 55, 0.5) 40%, transparent 50%)
            `
          }} />
          {/* Corruption glow */}
          <div className="absolute -inset-1 rounded-full bg-gray-600/20 blur-sm" />
        </motion.div>
        {/* Corruption particles around Malware planet */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-500 rounded-full"
            style={{
              top: `${55 + (Math.sin(i) * 3)}%`,
              left: `${75 + (Math.cos(i) * 3)}%`,
              boxShadow: '0 0 4px rgba(74, 85, 104, 0.6)',
              x: useTransform(springX, [-300, 300], [10, -10]),
              y: useTransform(springY, [-300, 300], [6, -6])
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3
            }}
          />
        ))}
        {/* Corruption lines */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`corruption-${i}`}
            className="absolute w-6 h-px bg-gray-500/50"
            style={{
              top: `${55 + (i * 1)}%`,
              left: `${75 + (i * 0.5)}%`,
              transform: `rotate(${i * 45}deg)`,
              x: useTransform(springX, [-300, 300], [10, -10]),
              y: useTransform(springY, [-300, 300], [6, -6])
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4
            }}
          />
        ))}

        {/* Planet 6: "Network" - Orange planet with realistic texture and connection lines - EXTREMELY LARGE */}
        <motion.div
          className="absolute w-22 h-22 rounded-full relative overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                #fed7aa 0%, 
                #f97316 25%, 
                #ea580c 50%, 
                #c2410c 75%, 
                #9a3412 100%
              )
            `,
            top: '75%',
            right: '35%',
            boxShadow: `
              0 0 35px rgba(249, 115, 22, 0.6),
              0 0 70px rgba(249, 115, 22, 0.3),
              inset -6px -6px 12px rgba(0, 0, 0, 0.4),
              inset 6px 6px 12px rgba(255, 255, 255, 0.1)
            `,
            x: useTransform(springX, [-300, 300], [16, -16]),
            y: useTransform(springY, [-300, 300], [-11, 11])
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Planet surface texture - network patterns */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(254, 215, 170, 0.7) 0%, transparent 12%),
              radial-gradient(circle at 75% 25%, rgba(154, 52, 18, 0.8) 0%, transparent 10%),
              radial-gradient(circle at 25% 75%, rgba(234, 88, 12, 0.6) 0%, transparent 8%),
              radial-gradient(circle at 75% 75%, rgba(254, 215, 170, 0.5) 0%, transparent 6%),
              linear-gradient(75deg, transparent 25%, rgba(249, 115, 22, 0.4) 35%, transparent 45%)
            `
          }} />
          {/* Network glow */}
          <div className="absolute -inset-1 rounded-full bg-orange-400/20 blur-sm" />
        </motion.div>
        {/* Network connection lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-px bg-orange-400/50"
            style={{
              top: `${75 + (i * 0.5)}%`,
              right: `${47 + (i * 1)}%`,
              transform: `rotate(${i * 15}deg)`,
              boxShadow: '0 0 4px rgba(249, 115, 22, 0.6)',
              x: useTransform(springX, [-300, 300], [16, -16]),
              y: useTransform(springY, [-300, 300], [-11, 11])
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scaleX: [0, 1.2, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2
            }}
          />
        ))}
        {/* Network nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            style={{
              top: `${75 + (Math.sin(i) * 2)}%`,
              right: `${35 + (Math.cos(i) * 2)}%`,
              boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)',
              x: useTransform(springX, [-300, 300], [16, -16]),
              y: useTransform(springY, [-300, 300], [-11, 11])
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>

      {/* Floating Stars */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX: useTransform(springX, [-300, 300], [5, -5]),
          rotateY: useTransform(springY, [-300, 300], [-5, 5]),
          transformStyle: 'preserve-3d'
        }}
      >
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${(i * 4) % 100}%`,
              top: `${(i * 6) % 100}%`,
              opacity: 0.2 + (i * 0.03),
              x: useTransform(springX, [-300, 300], [Math.sin(i) * 10, Math.sin(i) * 10]),
              y: useTransform(springY, [-300, 300], [Math.cos(i) * 10, Math.cos(i) * 10])
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3 + (i * 0.2),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }}
          />
        ))}
      </motion.div>

      {/* Data packet streams */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: useTransform(springX, [-300, 300], [-5, 5]),
          y: useTransform(springY, [-300, 300], [-5, 5])
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-1 bg-red-400/30 rounded-full"
            style={{
              left: `${(i * 12.5)}%`,
              top: '0%',
            }}
            animate={{
              y: [0, 1000],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 8 + (i * 0.5),
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1
            }}
          />
        ))}
      </motion.div>

      {/* Subtle Grid Overlay */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 64, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 64, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          x: useTransform(springX, [-300, 300], [-10, 10]),
          y: useTransform(springY, [-300, 300], [-10, 10])
        }}
      />
    </div>
  )
}