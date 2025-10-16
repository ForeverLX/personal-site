'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface DetailPageLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  breadcrumb?: {
    label: string
    href: string
  }
}

export default function DetailPageLayout({ 
  children, 
  title, 
  subtitle, 
  breadcrumb 
}: DetailPageLayoutProps) {
  const router = useRouter()

  // ESC key handler to go back
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.push('/')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [router])

  const handleBackClick = () => {
    router.push('/')
  }

  const handleBreadcrumbClick = () => {
    if (breadcrumb) {
      router.push(breadcrumb.href)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-500/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Home Link */}
            <motion.button
              onClick={handleBackClick}
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DG</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                DARRIUS GRATE
              </span>
            </motion.button>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              {breadcrumb && (
                <motion.button
                  onClick={handleBreadcrumbClick}
                  className="text-gray-300 hover:text-red-500 transition-colors duration-200 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>{breadcrumb.label}</span>
                </motion.button>
              )}
              
              <motion.button
                onClick={handleBackClick}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </motion.button>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Page Header */}
        <motion.section 
          className="py-16 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-red-500 via-purple-600 to-red-500 bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h1>
            {subtitle && (
              <motion.p 
                className="text-xl text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </motion.section>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      {/* ESC Key Hint */}
      <motion.div 
        className="fixed bottom-6 right-6 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-400"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        Press <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">ESC</kbd> to return home
      </motion.div>
    </div>
  )
}




