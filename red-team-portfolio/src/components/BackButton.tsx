'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface BackButtonProps {
  href: string
  label?: string
  className?: string
}

export default function BackButton({ 
  href, 
  label = "Back", 
  className = "" 
}: BackButtonProps) {
  return (
    <Link href={href}>
      <motion.button
        className={`group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors ${className}`}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          initial={{ x: 0 }}
          whileHover={{ x: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </motion.svg>
        <span className="text-sm font-medium">{label}</span>
      </motion.button>
    </Link>
  )
}



