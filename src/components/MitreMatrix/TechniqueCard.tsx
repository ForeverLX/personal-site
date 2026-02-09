'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { MitreTechnique } from './data/coverageData'

interface TechniqueCardProps {
  technique: MitreTechnique
  onClose: () => void
}

export function TechniqueCard({ technique, onClose }: TechniqueCardProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[1000] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="technique-title"
      aria-describedby="technique-description"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#1a1a1a] border-2 border-red-500 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-red-500/20">
          <div className="flex-1">
            <div className="font-mono text-sm text-red-400 mb-2">
              {technique.id}
            </div>
            <h3 id="technique-title" className="text-2xl font-bold text-white mb-2">
              {technique.name}
            </h3>
            <div className="text-gray-400 text-sm">
              Tactic: {technique.tactic}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 text-2xl font-bold p-2 transition-colors"
            aria-label="Close technique details"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
            <p id="technique-description" className="text-gray-300 leading-relaxed mb-4">
              {technique.description}
            </p>
            <a
              href={technique.mitrLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors"
            >
              View on MITRE ATT&CK →
            </a>
          </motion.div>

          {/* Tool Coverage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Red Team Toolkit Coverage</h4>
            {technique.tools.length > 0 ? (
              <div className="space-y-4">
                {technique.tools.map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-black/30 border border-red-500/20 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-semibold text-red-400 text-lg">
                        {tool.name}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          tool.implementation === 'automated'
                            ? 'bg-green-500/20 text-green-400'
                            : tool.implementation === 'manual'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {tool.implementation}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {tool.capability}
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      {tool.githubLink && (
                        <a
                          href={tool.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-400 hover:text-red-300 text-sm transition-colors"
                        >
                          View on GitHub →
                        </a>
                      )}
                      {tool.blogLink && (
                        <a
                          href={tool.blogLink}
                          className="text-red-400 hover:text-red-300 text-sm transition-colors"
                        >
                          Read Documentation →
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                This technique is not yet covered by the toolkit.
              </p>
            )}
          </motion.div>

          {/* Detection Opportunities */}
          {technique.detectionOpportunities && technique.detectionOpportunities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Detection Opportunities</h4>
              <div className="space-y-2">
                {technique.detectionOpportunities.map((opportunity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start p-3 bg-black/20 border-l-4 border-yellow-400 rounded-r-lg"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {opportunity}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
