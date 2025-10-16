'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function AnimatedTreeLogo() {
  const [elapsedTime, setElapsedTime] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  
  // Array of leaf image sources for variety
  const leafImages = [
    '/images/logo/leaf-1.svg',
    '/images/logo/leaf-2.svg', 
    '/images/logo/leaf-3.svg',
    '/images/logo/leaf-detailed.svg'
  ]
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[200px] h-[150px]">
        
        {/* SINGLE TREE - Using actual image */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-24 h-36"
          animate={{ 
            filter: [
              'brightness(0.85) contrast(1.15) drop-shadow(0 0 8px rgba(255, 0, 68, 0.3))',
              'brightness(0.9) contrast(1.2) drop-shadow(0 0 12px rgba(255, 0, 68, 0.6))',
              'brightness(0.85) contrast(1.15) drop-shadow(0 0 8px rgba(255, 0, 68, 0.3))'
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Image
            src="/images/logo/tree-bare-silhouette.svg"
            alt=""
            width={96}
            height={144}
            className="object-contain"
            priority
          />
        </motion.div>
        
        {/* SINGLE PERSON - Positioned at tree base */}
        <motion.div 
          className="absolute z-20 left-1/2 transform -translate-x-1/2"
          style={{
            bottom: 0,
            width: 50,
            height: 65
          }}
          animate={{ 
            opacity: [0.9, 1, 0.9],
            filter: [
              'brightness(0.9) contrast(1.5) drop-shadow(0 0 4px rgba(255, 0, 68, 0.3))',
              'brightness(1) contrast(1.6) drop-shadow(0 0 6px rgba(255, 0, 68, 0.5))',
              'brightness(0.9) contrast(1.5) drop-shadow(0 0 4px rgba(255, 0, 68, 0.3))'
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Image
            src="/images/logo/person-sitting-laptop.svg"
            alt=""
            width={50}
            height={65}
            className="object-contain"
          />
        </motion.div>
        
        {/* FALLING LEAVES - Simple and natural */}
        {[...Array(4)].map((_, i) => {
          const startX = 60 + (i * 20)
          const startY = 15 + (i % 2) * 10
          const side = i % 2 === 0 ? -1 : 1
          const leafImage = leafImages[i % leafImages.length]
          
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ 
                width: 10,
                height: 10
              }}
              initial={{ x: startX, y: startY, opacity: 1 }}
              animate={{
                y: [startY, 120],
                x: [
                  startX, 
                  startX + (side * 6),
                  startX + (side * 12),
                  startX + (side * 9),
                  startX + (side * 15)
                ],
                rotate: [0, side * 90, side * 180, side * 270, side * 360],
                opacity: [1, 1, 0.8, 0.4, 0]
              }}
              transition={{
                duration: 6 + i * 0.3,
                repeat: Infinity,
                delay: i * 1.0 + (elapsedTime % 50) / 50 * 6,
                ease: "easeInOut"
              }}
            >
              <Image
                src={leafImage}
                alt=""
                width={10}
                height={10}
                className="object-contain"
              />
            </motion.div>
          )
        })}
        
      </div>
      
      {/* Tagline */}
      <span className="text-white text-lg mt-3 tracking-wider font-normal" style={{fontFamily: 'Parisienne, cursive', letterSpacing: '0.1em', fontWeight: 400, textShadow: '0 0 10px rgba(255,255,255,0.3)'}}>
        Keep Moving Forward
      </span>
    </div>
  )
}