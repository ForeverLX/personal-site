'use client'

import { motion } from 'framer-motion'
import TwoTreesLogo from './TwoTreesLogo'
// Removed Link import - using smooth scroll buttons instead

export default function BlueYardFooter() {
  const currentYear = new Date().getFullYear()

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

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <motion.footer
      className="bg-gray-50 border-t border-gray-200"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            className="col-span-1 md:col-span-2"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-3 mb-6">
              <TwoTreesLogo size="navigation" variant="transparent" className="scale-75" />
              <span className="text-gray-900 font-medium text-lg">
                Red Team Portfolio
              </span>
            </div>
            <p className="text-gray-600 text-base max-w-md leading-relaxed">
              Showcasing the transition from professional consultant to red team operator. 
              Specializing in Active Directory security, C programming, and offensive security research.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-gray-900 font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('#about')}
                  className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#research')}
                  className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  Research
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#projects')}
                  className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#services')}
                  className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  Services
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-gray-900 font-semibold text-lg mb-6">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@darriusgrate.com"
                  className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ForeverLX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/darrius-grate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/DarriusGrate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  Twitter/X
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} Darrius Grate. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 sm:mt-0">
            Built with Next.js & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
