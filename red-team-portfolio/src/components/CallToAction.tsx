'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function CallToAction() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-20"
      style={{ y, opacity }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-light text-white mb-8">
            Ready to <span className="text-red-500">secure</span> your business?
          </h2>
          
          <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
            Professional security assessments for small-to-medium businesses. 
            From Active Directory security to comprehensive penetration testing, 
            I bring red team expertise to protect your organization.
          </p>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-red-500 mb-2">90+</div>
              <div className="text-gray-300">Days of Daily Coding</div>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-red-500 mb-2">3</div>
              <div className="text-gray-300">Production Tools Built</div>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-red-500 mb-2">15+</div>
              <div className="text-gray-300">Vulnerabilities Found</div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              onClick={() => {
                const element = document.querySelector('#services')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="group relative px-8 py-4 bg-red-500 text-white font-medium rounded-none border border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300 flex items-center space-x-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Services</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </motion.button>

            <motion.button
              onClick={() => {
                const element = document.querySelector('#contact')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="group relative px-8 py-4 bg-transparent text-gray-300 font-medium rounded-none border border-gray-600 hover:border-red-500 hover:text-red-500 transition-all duration-300 flex items-center space-x-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </motion.svg>
          </motion.button>
          </div>

          {/* Additional Info */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-4">
              Building in public • Transparent methodology • Production-quality tools
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>✓ NDA Compliant</span>
              <span>✓ Detailed Reports</span>
              <span>✓ 30-Day Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
