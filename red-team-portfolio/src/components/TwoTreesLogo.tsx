'use client'

import { motion } from 'framer-motion'

interface TwoTreesLogoProps {
  variant?: 'transparent' | 'gradient' | 'ground'
  size?: 'hero' | 'navigation' | 'favicon'
  className?: string
}

export default function TwoTreesLogo({ 
  variant = 'transparent', 
  size = 'navigation',
  className = '' 
}: TwoTreesLogoProps) {
  
  // Size configurations
  const sizeConfig = {
    hero: { width: 600, height: 80, textSize: 'text-4xl' },
    navigation: { width: 350, height: 60, textSize: 'text-2xl' },
    favicon: { width: 32, height: 32, textSize: 'text-xs' }
  }

  const config = sizeConfig[size]
  const showText = size !== 'favicon' // Hide text on favicon

  // Background variants
  const backgroundVariants = {
    transparent: '',
    gradient: 'bg-gradient-to-r from-red-900/20 via-purple-900/20 to-blue-900/20 rounded-lg p-4',
    ground: 'relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-red-500 after:via-purple-500 after:to-blue-500'
  }

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center ${backgroundVariants[variant]} ${className}`}
      style={{ width: config.width, height: config.height }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced "Keep Moving Forward" Text */}
      {showText && (
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <svg 
            width={size === 'hero' ? 600 : size === 'navigation' ? 350 : 30} 
            height={size === 'hero' ? 80 : size === 'navigation' ? 60 : 8} 
            viewBox="0 0 600 80"
            className="drop-shadow-2xl"
          >
            <defs>
              {/* Enhanced gradient with more color stops for richer effect */}
              <linearGradient id="enhancedTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="15%" stopColor="#ff4500" />
                <stop offset="30%" stopColor="#ff6b35" />
                <stop offset="45%" stopColor="#dc2626" />
                <stop offset="60%" stopColor="#9333ea" />
                <stop offset="75%" stopColor="#7c3aed" />
                <stop offset="90%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              
              {/* Glow effect */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              {/* Shadow effect */}
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="2" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.3"/>
              </filter>
            </defs>
            
            {/* Main text with enhanced gradient */}
            <text 
              x="300" 
              y={size === 'hero' ? 50 : size === 'navigation' ? 40 : 6} 
              textAnchor="middle" 
              fill="url(#enhancedTextGradient)" 
              fontSize={size === 'hero' ? 36 : size === 'navigation' ? 28 : 8} 
              fontFamily="serif" 
              fontWeight="600"
              filter="url(#shadow)"
              className="select-none"
            >
              Keep Moving Forward
            </text>
            
            {/* Subtle glow layer */}
            <text 
              x="300" 
              y={size === 'hero' ? 50 : size === 'navigation' ? 40 : 6} 
              textAnchor="middle" 
              fill="url(#enhancedTextGradient)" 
              fontSize={size === 'hero' ? 36 : size === 'navigation' ? 28 : 8} 
              fontFamily="serif" 
              fontWeight="600"
              filter="url(#glow)"
              opacity="0.3"
              className="select-none"
            >
              Keep Moving Forward
            </text>
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}