'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function SophisticatedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  
  const backgroundColor = useTransform(scrollY, [0, 100], ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.95)'])
  const borderColor = useTransform(scrollY, [0, 100], ['rgba(255, 0, 64, 0)', 'rgba(255, 0, 64, 0.2)'])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Research', href: '#research' },
    { name: 'Tools', href: '#tools' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ backgroundColor, borderBottom: `1px solid ${borderColor}` }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Red Galaxy accent */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <button 
              onClick={() => scrollToSection('#home')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">DG</span>
              </div>
              <span className="text-white font-medium text-lg">
                Red Team Portfolio
              </span>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="relative text-gray-300 hover:text-red-400 transition-colors duration-200 font-medium group"
                  >
                    {item.name}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-600 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-red-400 transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-6 py-4 bg-gray-900/95 backdrop-blur-md border-t border-red-500/20">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                onClick={() => {
                  scrollToSection(item.href)
                  setIsOpen(false)
                }}
                className="block py-3 text-gray-300 hover:text-red-400 transition-colors duration-200 font-medium w-full text-left"
              >
                {item.name}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}