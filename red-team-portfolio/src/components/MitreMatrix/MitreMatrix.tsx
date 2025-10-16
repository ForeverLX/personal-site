'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mitreCoverage, getTacticGroups, getCoverageStats } from './data/coverageData'
import { TechniqueCard } from './TechniqueCard'

function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, ease: "easeOut" }}
      >
        {value.toLocaleString()}
      </motion.span>
    </motion.span>
  )
}

export function MitreMatrix() {
  const [filterCoverage, setFilterCoverage] = useState<'all' | 'full' | 'partial' | 'none'>('all')
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null)
  
  const tacticGroups = getTacticGroups()
  const stats = getCoverageStats()

  const filteredTechniques = filterCoverage === 'all' 
    ? mitreCoverage 
    : mitreCoverage.filter(t => t.coverage === filterCoverage)

  return (
    <section className="py-16" aria-label="MITRE ATT&CK coverage matrix">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            <span className="text-red-500">MITRE ATT&CK</span> Coverage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg mb-8"
          >
            Mapping my Red Team Operations Toolkit to industry-standard attack techniques
          </motion.p>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-black/30 border border-red-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                <AnimatedNumber value={stats.total} />
              </div>
              <div className="text-gray-300 text-xs">Total Techniques</div>
            </div>
            <div className="bg-black/30 border border-red-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                <AnimatedNumber value={stats.full} />
              </div>
              <div className="text-gray-300 text-xs">Fully Automated</div>
            </div>
            <div className="bg-black/30 border border-red-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                <AnimatedNumber value={stats.partial} />
              </div>
              <div className="text-gray-300 text-xs">Partial Coverage</div>
            </div>
            <div className="bg-black/30 border border-red-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">
                <AnimatedNumber value={stats.coveragePercentage} />
              </div>
              <div className="text-gray-300 text-xs">Coverage Rate</div>
            </div>
          </motion.div>

          {/* Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-3 justify-center flex-wrap mb-8"
          >
            <button
              onClick={() => setFilterCoverage('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filterCoverage === 'all'
                  ? 'bg-red-600 text-white border border-red-600'
                  : 'bg-black/30 text-gray-300 border border-red-500/30 hover:border-red-500/50'
              }`}
            >
              All Techniques
            </button>
            <button
              onClick={() => setFilterCoverage('full')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                filterCoverage === 'full'
                  ? 'bg-red-600 text-white border border-red-600'
                  : 'bg-black/30 text-gray-300 border border-red-500/30 hover:border-red-500/50'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              Fully Automated
            </button>
            <button
              onClick={() => setFilterCoverage('partial')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                filterCoverage === 'partial'
                  ? 'bg-red-600 text-white border border-red-600'
                  : 'bg-black/30 text-gray-300 border border-red-500/30 hover:border-red-500/50'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              Partial Coverage
            </button>
          </motion.div>
        </div>

        {/* Matrix Grid - Organized by Tactic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          {Array.from(tacticGroups.entries()).map(([tactic, techniques]) => {
            const filteredTacticTechniques = techniques.filter(t => 
              filterCoverage === 'all' || t.coverage === filterCoverage
            )
            
            if (filteredTacticTechniques.length === 0) return null
            
            return (
              <div key={tactic} className="bg-black/40 backdrop-blur-sm border border-red-500/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-6 pb-3 border-b border-red-500/20">
                  {tactic}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTacticTechniques.map((technique, index) => (
                    <motion.div
                      key={technique.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTechnique(technique.id)}
                      className={`relative bg-black/20 border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        technique.coverage === 'full'
                          ? 'border-green-500/30 hover:border-green-500/60 hover:shadow-green-500/20'
                          : technique.coverage === 'partial'
                          ? 'border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-yellow-500/20'
                          : 'border-gray-500/30 hover:border-gray-500/60'
                      } hover:shadow-lg`}
                    >
                      {/* Coverage indicator bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg ${
                        technique.coverage === 'full'
                          ? 'bg-green-500'
                          : technique.coverage === 'partial'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                      }`} />
                      
                      <div className="font-mono text-xs text-red-400 mb-2">
                        {technique.id}
                      </div>
                      
                      <div className="text-white text-sm font-medium mb-3 leading-tight">
                        {technique.name}
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-700/50">
                        <div className="text-xs text-gray-400">
                          {technique.tools.length > 0 && (
                            <span>
                              {technique.tools.length} tool{technique.tools.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          technique.coverage === 'full'
                            ? 'bg-green-400'
                            : technique.coverage === 'partial'
                            ? 'bg-yellow-400'
                            : 'bg-gray-400'
                        }`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Coverage based on Red Team Operations Toolkit • 
            <a 
              href="https://attack.mitre.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 ml-1"
            >
              MITRE ATT&CK Framework
            </a>
          </p>
        </motion.div>
      </div>

      {/* Selected Technique Detail Modal */}
      <AnimatePresence>
        {selectedTechnique && (
          <TechniqueCard
            technique={mitreCoverage.find(t => t.id === selectedTechnique)!}
            onClose={() => setSelectedTechnique(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
