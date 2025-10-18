'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function AboutPreview() {
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
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-8">
            <span className="text-red-500">About</span> the Journey
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              I've built <span className="text-red-500 font-semibold">3 production-ready projects</span> and 
              covered <span className="text-red-500 font-semibold">10 MITRE ATT&CK techniques</span> (70% automation) in my 
              transition from professional consulting to red team operations. This isn't just a career change—it's 
              a complete transformation of how I approach security.
            </p>
            
            <p className="text-lg text-gray-400 leading-relaxed mb-12">
              Every day, I'm building production-quality tools, documenting my learning process, 
              and sharing insights with the security community. Follow the journey from 
              <span className="text-gray-500"> &lt;$30k/year</span> to red team operations.
            </p>
            
            <motion.button
              onClick={() => {
                window.location.href = '/about'
              }}
              className="inline-flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              <span>Read the Full Story</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
