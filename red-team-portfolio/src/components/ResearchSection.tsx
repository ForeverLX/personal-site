'use client'

import { motion } from 'framer-motion'
export default function ResearchSection() {
  return (
    <section className="relative min-h-screen py-20">
      <div id="research" className="absolute top-0 left-0 w-full h-1"></div>
      
      {/* Subtle Research Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-500/20 rounded-full"
            style={{
              left: `${(i * 8) % 100}%`,
              top: `${(i * 12) % 100}%`
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      <div className="text-center">
        <motion.h2
          className="text-4xl lg:text-5xl font-light text-white mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Research
        </motion.h2>
        
        <motion.p
          className="text-lg text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Deep-dive technical research, security findings, and analysis from red team operations.
        </motion.p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="p-8 bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-medium text-white mb-4">Active Directory Security</h3>
            <p className="text-gray-300 mb-4">
              Detailed analysis of Active Directory attack vectors, defensive techniques, 
              and tool development insights.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">C Programming</span>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">Active Directory</span>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">Security Research</span>
            </div>
            <motion.button
              onClick={() => {
                window.location.href = '/research/ad-attack-paths'
              }}
              className="text-red-500 hover:text-red-400 transition-colors duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Read Research →
            </motion.button>
          </motion.div>
          
          <motion.div
            className="p-8 bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-medium text-white mb-4">C Programming for Security</h3>
            <p className="text-gray-300 mb-4">
              Technical deep-dives into building high-performance security tools using C programming.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">C Programming</span>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">Tool Development</span>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">Performance</span>
            </div>
            <motion.button
              onClick={() => {
                window.location.href = '/research/kernel-exploitation'
              }}
              className="text-red-500 hover:text-red-400 transition-colors duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Read Research →
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => {
              window.location.href = '/research'
            }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Research</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
