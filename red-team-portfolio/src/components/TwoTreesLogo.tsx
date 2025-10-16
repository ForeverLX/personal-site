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
    hero: { width: 600, height: 200, textSize: 'text-2xl' },
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
      <div className="flex items-end justify-center space-x-2 mb-2">
        {/* Red Team Tree (Left) */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg 
            width={size === 'hero' ? 80 : size === 'navigation' ? 20 : 12} 
            height={size === 'hero' ? 100 : size === 'navigation' ? 25 : 15}
            viewBox="0 0 80 100"
            className="drop-shadow-lg"
          >
            {/* Tree trunk */}
            <rect x="35" y="60" width="10" height="40" fill="#4A1A1A" />
            
            {/* Tree foliage - Red Team gradient */}
            <defs>
              <linearGradient id="redTeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B0000" />
                <stop offset="50%" stopColor="#DC143C" />
                <stop offset="100%" stopColor="#FF0000" />
              </linearGradient>
            </defs>
            
            {/* Main foliage layers */}
            <ellipse cx="40" cy="45" rx="25" ry="35" fill="url(#redTeamGradient)" />
            <ellipse cx="40" cy="35" rx="20" ry="25" fill="url(#redTeamGradient)" />
            <ellipse cx="40" cy="25" rx="15" ry="20" fill="url(#redTeamGradient)" />
            
            {/* Branch details */}
            <path d="M25 50 Q40 45 55 50" stroke="#8B0000" strokeWidth="2" fill="none" />
            <path d="M30 40 Q40 35 50 40" stroke="#8B0000" strokeWidth="1.5" fill="none" />
            <path d="M35 30 Q40 25 45 30" stroke="#8B0000" strokeWidth="1" fill="none" />
          </svg>
        </motion.div>

        {/* Purple Team Glow (Center overlap) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-8 h-8 bg-purple-500 rounded-full blur-sm opacity-30" />
        </motion.div>

        {/* Blue Team Tree (Right) */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <svg 
            width={size === 'hero' ? 80 : size === 'navigation' ? 20 : 12} 
            height={size === 'hero' ? 100 : size === 'navigation' ? 25 : 15}
            viewBox="0 0 80 100"
            className="drop-shadow-lg"
          >
            {/* Tree trunk */}
            <rect x="35" y="60" width="10" height="40" fill="#1A1A4A" />
            
            {/* Tree foliage - Blue Team gradient */}
            <defs>
              <linearGradient id="blueTeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#000080" />
                <stop offset="50%" stopColor="#003399" />
                <stop offset="100%" stopColor="#0066CC" />
              </linearGradient>
            </defs>
            
            {/* Main foliage layers */}
            <ellipse cx="40" cy="45" rx="25" ry="35" fill="url(#blueTeamGradient)" />
            <ellipse cx="40" cy="35" rx="20" ry="25" fill="url(#blueTeamGradient)" />
            <ellipse cx="40" cy="25" rx="15" ry="20" fill="url(#blueTeamGradient)" />
            
            {/* Branch details */}
            <path d="M25 50 Q40 45 55 50" stroke="#000080" strokeWidth="2" fill="none" />
            <path d="M30 40 Q40 35 50 40" stroke="#000080" strokeWidth="1.5" fill="none" />
            <path d="M35 30 Q40 25 45 30" stroke="#000080" strokeWidth="1" fill="none" />
          </svg>
        </motion.div>
      </div>

      {/* Text */}
      {showText && (
        <motion.div
          className={`text-white font-serif ${config.textSize} font-medium tracking-wide`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Keep Moving Forward
        </motion.div>
      )}
    </motion.div>
  )
}