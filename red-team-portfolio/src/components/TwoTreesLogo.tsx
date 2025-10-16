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
    hero: { width: 400, height: 120, textSize: 'text-lg' },
    navigation: { width: 150, height: 50, textSize: 'text-sm' },
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
      {/* Trees Container */}
      <div className="flex items-end justify-center space-x-1 mb-2">
        <svg 
          width={size === 'hero' ? 200 : size === 'navigation' ? 60 : 20} 
          height={size === 'hero' ? 80 : size === 'navigation' ? 24 : 12}
          viewBox="0 0 200 80"
          className="drop-shadow-lg"
        >
          <defs>
            {/* Text gradient: red → purple → blue */}
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          {/* Left Tree - Bare Winter Branches */}
          <g>
            {/* Main trunk */}
            <rect x="85" y="50" width="6" height="30" fill="#000000" />
            
            {/* Left tree branches - leaning right */}
            <path d="M85 50 L75 40 L70 35 L65 30 L60 25" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M85 45 L80 35 L75 30 L70 25 L65 20" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M85 40 L82 30 L78 25 L74 20 L70 15" stroke="#000000" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M85 35 L83 25 L80 20 L77 15 L74 10" stroke="#000000" strokeWidth="1" fill="none" strokeLinecap="round" />
            
            {/* Secondary branches */}
            <path d="M75 40 L70 35 L65 30" stroke="#000000" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M80 35 L75 30 L70 25" stroke="#000000" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M82 30 L78 25 L74 20" stroke="#000000" strokeWidth="0.6" fill="none" strokeLinecap="round" />
          </g>

          {/* Right Tree - Bare Winter Branches */}
          <g>
            {/* Main trunk */}
            <rect x="109" y="50" width="6" height="30" fill="#000000" />
            
            {/* Right tree branches - leaning left */}
            <path d="M115 50 L125 40 L130 35 L135 30 L140 25" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M115 45 L120 35 L125 30 L130 25 L135 20" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M115 40 L118 30 L122 25 L126 20 L130 15" stroke="#000000" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M115 35 L117 25 L120 20 L123 15 L126 10" stroke="#000000" strokeWidth="1" fill="none" strokeLinecap="round" />
            
            {/* Secondary branches */}
            <path d="M125 40 L130 35 L135 30" stroke="#000000" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M120 35 L125 30 L130 25" stroke="#000000" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M118 30 L122 25 L126 20" stroke="#000000" strokeWidth="0.6" fill="none" strokeLinecap="round" />
          </g>

          {/* Interlocking branches at the top - where trees connect */}
          <g>
            {/* Connection point - branches intertwine */}
            <path d="M70 15 Q100 5 130 15" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M74 10 Q100 0 126 10" stroke="#000000" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M78 5 Q100 -5 122 5" stroke="#000000" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            
            {/* Small connecting branches */}
            <path d="M85 25 Q100 20 115 25" stroke="#000000" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            <path d="M87 20 Q100 15 113 20" stroke="#000000" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Text with gradient */}
      {showText && (
        <motion.div
          className={`font-serif ${config.textSize} font-medium tracking-wide`}
          style={{ fill: 'url(#textGradient)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <svg width={size === 'hero' ? 300 : size === 'navigation' ? 120 : 30} height={size === 'hero' ? 30 : size === 'navigation' ? 15 : 8} viewBox="0 0 300 30">
            <defs>
              <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <text x="150" y="20" textAnchor="middle" fill="url(#textGradient)" fontSize="16" fontFamily="serif" fontWeight="500">
              Keep Moving Forward
            </text>
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}