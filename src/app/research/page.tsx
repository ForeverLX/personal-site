'use client'

import { motion } from 'framer-motion'

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-red-400 to-purple-400 bg-clip-text text-transparent">
              Research & Analysis
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Deep-dive technical research, security findings, and analysis from red team operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Active Directory Security Research
              </h2>
              <p className="text-gray-300 mb-6">
                Detailed analysis of Active Directory attack vectors, defensive techniques, and tool development insights.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200">AD Security</span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200">Attack Paths</span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200">Defense</span>
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Coming Soon
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                C Programming for Security Tools
              </h2>
              <p className="text-gray-300 mb-6">
                Technical deep-dives into building high-performance security tools using C programming.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200">C Programming</span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200">Kernel Development</span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200">Performance</span>
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Coming Soon
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

