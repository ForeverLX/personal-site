'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import TwoTreesLogo from './TwoTreesLogo'

export default function SophisticatedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const router = useRouter()
  
  const backgroundColor = useTransform(scrollY, [0, 100], ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.95)'])
  const borderColor = useTransform(scrollY, [0, 100], ['rgba(255, 0, 64, 0)', 'rgba(255, 0, 64, 0.2)'])
  
  const isHomepage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/', section: '#home' },
    { name: 'About', href: '/about', section: '#about' },
    { name: 'Projects', href: '/projects', section: '#projects' },
    { name: 'Research', href: '/research', section: '#research' },
    { name: 'Services', href: '/services', section: '#services' },
    { name: 'Contact', href: '/contact', section: '#contact' },
  ]

  const scrollToSection = (section: string) => {
    if (section === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    const element = document.querySelector(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavClick = (item: typeof navItems[0]) => {
    if (isHomepage && item.href === '/') {
      // On homepage: scroll to top
      scrollToSection(item.section)
    } else {
      // For all other pages: navigate using Next.js router
      router.push(item.href)
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
          {/* Animated Tree Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <button 
              onClick={() => handleNavClick({ name: 'Home', href: '/', section: '#home' })}
              className="hover:opacity-80 transition-opacity"
            >
              <TwoTreesLogo size="navigation" variant="transparent" />
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:block"
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
                    onClick={() => handleNavClick(item)}
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
            className="lg:hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="text-white hover:text-red-400 transition-colors duration-200 p-2 bg-gray-900/50 rounded-lg"
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
        className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}
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
                  handleNavClick(item)
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