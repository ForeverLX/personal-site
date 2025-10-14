'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

const attackChain = [
  {
    id: 'aclguard',
    name: 'ACLGuard v2.0',
    phase: 'Initial Access & Recon',
    description: 'Automates AD enumeration and attack path discovery',
    features: [
      'Kerberoasting automation',
      'BloodHound integration',
      'Attack path analysis',
      'Payload generation'
    ],
    mitre: ['T1087.002', 'T1558.003'],
    link: '#projects',
    icon: '🛡️'
  },
  {
    id: 'c2',
    name: 'Custom C2 Framework',
    phase: 'Command & Control',
    description: 'Lightweight command and control infrastructure',
    features: [
      'HTTP/HTTPS communication',
      'Multi-platform agents',
      'Encrypted channels',
      'Steganography support'
    ],
    mitre: ['T1071.001', 'T1102'],
    link: '#projects',
    icon: '🎯'
  },
  {
    id: 'rootkit',
    name: 'Linux Rootkit',
    phase: 'Persistence & Stealth',
    description: 'Kernel-level persistence and stealth module',
    features: [
      'Process hiding',
      'File system hiding',
      'Network traffic obfuscation',
      'Anti-forensics'
    ],
    mitre: ['T1055', 'T1564.001'],
    link: '#projects',
    icon: '🔒'
  }
]

export default function AttackChainVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
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
      <div className="relative z-50 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-8">
            <span className="text-red-500">Red Team</span> Operations Toolkit
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Three interconnected tools demonstrating the complete attack lifecycle
          </p>
        </motion.div>

        {/* Attack Chain Visualization - Enhanced */}
        <div className="relative">
          {/* Sophisticated Connection Network with Data Flow Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full max-w-4xl" viewBox="0 0 800 800">
              {/* Main Connection Lines with Enhanced Animations */}
              <motion.path
                d="M 400 150 Q 400 250 400 350"
                stroke="url(#gradient1)"
                strokeWidth="6"
                fill="none"
                strokeDasharray="20,10"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 4, delay: 0.5 }}
                viewport={{ once: true }}
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(255, 0, 64, 0.8)) drop-shadow(0 0 24px rgba(255, 0, 64, 0.4))'
                }}
              />
              <motion.path
                d="M 400 350 Q 400 450 400 550"
                stroke="url(#gradient2)"
                strokeWidth="6"
                fill="none"
                strokeDasharray="20,10"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 4, delay: 1.5 }}
                viewport={{ once: true }}
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(139, 58, 139, 0.8)) drop-shadow(0 0 24px rgba(139, 58, 139, 0.4))'
                }}
              />
              
              {/* Side Connection Lines for Network Effect */}
              <motion.path
                d="M 200 250 Q 300 300 400 350"
                stroke="url(#gradient3)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="15,8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, delay: 2 }}
                viewport={{ once: true }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 77, 109, 0.6))'
                }}
              />
              <motion.path
                d="M 600 250 Q 500 300 400 350"
                stroke="url(#gradient3)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="15,8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, delay: 2.2 }}
                viewport={{ once: true }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 77, 109, 0.6))'
                }}
              />
              
              {/* Enhanced Animated Data Packets - Multiple Types */}
              {/* Primary Data Packets */}
              <motion.circle
                r="8"
                fill="#ff0040"
                initial={{ cx: 400, cy: 150 }}
                whileInView={{ cx: 400, cy: 350 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2.5 }}
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255, 0, 64, 1)) drop-shadow(0 0 20px rgba(255, 0, 64, 0.6))'
                }}
              />
              <motion.circle
                r="8"
                fill="#8b3a8b"
                initial={{ cx: 400, cy: 350 }}
                whileInView={{ cx: 400, cy: 550 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 3.5 }}
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(139, 58, 139, 1)) drop-shadow(0 0 20px rgba(139, 58, 139, 0.6))'
                }}
              />
              
              {/* Secondary Data Packets */}
              <motion.circle
                r="6"
                fill="#ff4d6d"
                initial={{ cx: 400, cy: 150 }}
                whileInView={{ cx: 400, cy: 350 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 3 }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 77, 109, 0.8))'
                }}
              />
              <motion.circle
                r="6"
                fill="#cc0033"
                initial={{ cx: 400, cy: 350 }}
                whileInView={{ cx: 400, cy: 550 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 4 }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(204, 0, 51, 0.8))'
                }}
              />
              
              {/* Side Data Packets */}
              <motion.circle
                r="5"
                fill="#ff6b6b"
                initial={{ cx: 200, cy: 250 }}
                whileInView={{ cx: 400, cy: 350 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2.8 }}
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(255, 107, 107, 0.7))'
                }}
              />
              <motion.circle
                r="5"
                fill="#ff6b6b"
                initial={{ cx: 600, cy: 250 }}
                whileInView={{ cx: 400, cy: 350 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 3.2 }}
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(255, 107, 107, 0.7))'
                }}
              />
              
              {/* Small Data Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.circle
                  key={i}
                  r="3"
                  fill="#ff9999"
                  initial={{ cx: 400, cy: 150 }}
                  whileInView={{ cx: 400, cy: 350 }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "linear", 
                    delay: 3.5 + (i * 0.2) 
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(255, 153, 153, 0.6))'
                  }}
                />
              ))}
              
              {/* Network Nodes/Connection Points */}
              <motion.circle
                cx="400"
                cy="150"
                r="12"
                fill="none"
                stroke="#ff0040"
                strokeWidth="3"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 0, 64, 0.8))'
                }}
              />
              <motion.circle
                cx="400"
                cy="350"
                r="12"
                fill="none"
                stroke="#8b3a8b"
                strokeWidth="3"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
                viewport={{ once: true }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(139, 58, 139, 0.8))'
                }}
              />
              <motion.circle
                cx="400"
                cy="550"
                r="12"
                fill="none"
                stroke="#1a1f3a"
                strokeWidth="3"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 3 }}
                viewport={{ once: true }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(26, 31, 58, 0.8))'
                }}
              />
              
              {/* Enhanced Gradient Definitions */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff0040" />
                  <stop offset="50%" stopColor="#ff4d6d" />
                  <stop offset="100%" stopColor="#8b3a8b" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b3a8b" />
                  <stop offset="50%" stopColor="#cc0033" />
                  <stop offset="100%" stopColor="#1a1f3a" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff4d6d" />
                  <stop offset="50%" stopColor="#ff6b6b" />
                  <stop offset="100%" stopColor="#8b3a8b" />
                </linearGradient>
                
                {/* Glow Effects */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>

          {/* Attack Chain Nodes */}
          <div className="space-y-8">
            {attackChain.map((node, index) => (
              <motion.div
                key={node.id}
                className="flex items-center justify-center"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Enhanced Node Card */}
                  <div className="relative bg-gray-900/40 rounded-3xl border border-gray-700/30 backdrop-blur-md p-8 w-96 hover:border-red-500/70 transition-all duration-500 group overflow-hidden">
                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Enhanced Header */}
                    <div className="flex items-center space-x-6 mb-6 relative z-10">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{node.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">{node.name}</h3>
                        <p className="text-sm text-red-500 font-semibold bg-red-500/10 px-3 py-1 rounded-full inline-block mt-1">{node.phase}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed relative z-10">{node.description}</p>
                    
                    {/* Enhanced Features */}
                    <div className="space-y-3 mb-6 relative z-10">
                      {node.features.map((feature, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center space-x-3 group/feature"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full group-hover/feature:scale-125 transition-transform duration-200"></div>
                          <span className="text-sm text-gray-400 group-hover/feature:text-gray-300 transition-colors duration-200">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Enhanced MITRE ATT&CK */}
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {node.mitre.map((technique, i) => (
                        <motion.span 
                          key={i} 
                          className="px-3 py-1.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 text-xs rounded-full border border-red-500/30 hover:border-red-500/60 transition-all duration-200"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {technique}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Hover Tooltip */}
                  {hoveredNode === node.id && (
                    <motion.div
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-900 border border-red-500/50 rounded-lg p-3 w-64 z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <p className="text-sm text-gray-300 text-center">
                        Click to explore {node.name} in detail
                      </p>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => {
              const element = document.querySelector('#tools')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent text-white font-medium rounded-lg border border-gray-600 hover:border-red-500 hover:text-red-500 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore All Projects</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
