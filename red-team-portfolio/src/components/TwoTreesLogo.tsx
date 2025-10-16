'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function TwoTreesLogo() {
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
      <div className="relative w-[280px] h-[200px]">
        
        {/* LEFT TREE - Clean silhouette with subtle glow */}
        <motion.div 
          className="absolute left-0 bottom-0 w-28 h-40"
          animate={{ 
            filter: [
              'drop-shadow(0 0 4px rgba(255, 0, 68, 0.2))',
              'drop-shadow(0 0 8px rgba(255, 0, 68, 0.4))',
              'drop-shadow(0 0 4px rgba(255, 0, 68, 0.2))'
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
            width={112}
            height={160}
            className="object-contain"
            priority
          />
        </motion.div>
        
        {/* RIGHT TREE - Clean silhouette with subtle glow */}
        <motion.div 
          className="absolute right-0 bottom-0 w-28 h-40"
          animate={{ 
            filter: [
              'drop-shadow(0 0 4px rgba(0, 136, 255, 0.2))',
              'drop-shadow(0 0 8px rgba(0, 136, 255, 0.4))',
              'drop-shadow(0 0 4px rgba(0, 136, 255, 0.2))'
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <Image
            src="/images/logo/tree-bare-silhouette.svg"
            alt=""
            width={112}
            height={160}
            className="object-contain scale-x-[-1]"
            priority
          />
        </motion.div>
        
        {/* CANOPY CONNECTION - Simple CSS-based glow effect */}
        <motion.div
          className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scaleY: [1, 1.5, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* LEFT PERSON - Clearly visible at tree base */}
        <motion.div 
          className="absolute z-20"
          style={{
            left: 12,
            bottom: 0,
            width: 55,
            height: 70
          }}
          animate={{ 
            opacity: [0.95, 1, 0.95],
            filter: [
              'drop-shadow(0 0 3px rgba(255, 0, 68, 0.2))',
              'drop-shadow(0 0 5px rgba(255, 0, 68, 0.3))',
              'drop-shadow(0 0 3px rgba(255, 0, 68, 0.2))'
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
            width={55}
            height={70}
            className="object-contain"
          />
        </motion.div>
        
        {/* RIGHT PERSON - Clearly visible at tree base, facing left */}
        <motion.div 
          className="absolute z-20"
          style={{
            right: 12,
            bottom: 0,
            width: 55,
            height: 70
          }}
          animate={{ 
            opacity: [0.95, 1, 0.95],
            filter: [
              'drop-shadow(0 0 3px rgba(0, 136, 255, 0.2))',
              'drop-shadow(0 0 5px rgba(0, 136, 255, 0.3))',
              'drop-shadow(0 0 3px rgba(0, 136, 255, 0.2))'
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <Image
            src="/images/logo/person-sitting-laptop.svg"
            alt=""
            width={55}
            height={70}
            className="object-contain scale-x-[-1]"
          />
        </motion.div>
        
        {/* FALLING LEAVES - Simple and natural */}
        {[...Array(5)].map((_, i) => {
          const startX = 40 + (i * 50)
          const startY = 20 + (i % 2) * 15
          const side = i % 2 === 0 ? -1 : 1
          const leafImage = leafImages[i % leafImages.length]
          
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ 
                width: 12,
                height: 12
              }}
              initial={{ x: startX, y: startY, opacity: 1 }}
              animate={{
                y: [startY, 160],
                x: [
                  startX, 
                  startX + (side * 8),
                  startX + (side * 16),
                  startX + (side * 12),
                  startX + (side * 20)
                ],
                rotate: [0, side * 90, side * 180, side * 270, side * 360],
                opacity: [1, 1, 0.8, 0.4, 0]
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                delay: i * 1.2 + (elapsedTime % 60) / 60 * 8,
                ease: "easeInOut"
              }}
            >
              <Image
                src={leafImage}
                alt=""
                width={12}
                height={12}
                className="object-contain"
              />
            </motion.div>
          )
        })}
        
      </div>
      
      {/* Tagline */}
      <span className="text-white text-xl mt-4 tracking-wider font-normal" style={{fontFamily: 'Parisienne, cursive', letterSpacing: '0.1em', fontWeight: 400, textShadow: '0 0 10px rgba(255,255,255,0.3)'}}>
        Keep Moving Forward
      </span>
    </div>
  )
}