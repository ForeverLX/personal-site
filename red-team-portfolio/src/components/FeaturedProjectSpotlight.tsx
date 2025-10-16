'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function FeaturedProjectSpotlight() {
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
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-8">
            <span className="text-red-500">Featured</span> Project
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            The centerpiece of my Red Team Operations Toolkit
          </p>
        </motion.div>

        {/* Large Project Card */}
        <motion.div
          className="relative bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Project Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">ACLGuard v2.0</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                      Active Development
                    </span>
                    <span className="text-gray-400 text-sm">Week 3/12</span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                Advanced Active Directory ACL analysis and privilege escalation detection tool. 
                Automates enumeration, identifies attack paths, and generates custom payloads 
                for red team operations.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-red-500">47</div>
                  <div className="text-sm text-gray-400">GitHub Stars</div>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-red-500">1.2k</div>
                  <div className="text-sm text-gray-400">Commits</div>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-red-500">3</div>
                  <div className="text-sm text-gray-400">Tools Built</div>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-white font-medium mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">Python</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">Active Directory</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">BloodHound</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">Kerberos</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">LDAP</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={() => {
                    window.location.href = '/projects/aclguard'
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View Project</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={() => {
                    window.location.href = '/projects'
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View All Projects</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Project Visual */}
            <div className="relative">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-2">ACLGuard v2.0</span>
                  </div>
                  
                  <div className="space-y-2 text-sm font-mono">
                    <div className="text-green-400">$ python aclguard.py --domain vulnerable.local</div>
                    <div className="text-gray-300">[+] Enumerating Active Directory...</div>
                    <div className="text-gray-300">[+] Found 15 users with SPN</div>
                    <div className="text-yellow-400">[!] Kerberoasting opportunity detected</div>
                    <div className="text-gray-300">[+] Generating attack paths...</div>
                    <div className="text-red-400">[!] 3 privilege escalation paths found</div>
                    <div className="text-gray-300">[+] Attack chain visualization complete</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
