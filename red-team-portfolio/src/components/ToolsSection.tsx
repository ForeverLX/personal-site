'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ToolsSection() {
  const projects = [
    {
      id: 'aclguard',
      title: 'ACLGuard v2.0',
      description: 'Advanced Active Directory ACL analysis and privilege escalation detection tool with real-time monitoring capabilities.',
      icon: '🔐',
      color: 'red',
      tech: ['C', 'Active Directory', 'WinAPI'],
      status: 'Active Development',
      stars: 24,
      forks: 8,
      link: '/projects/aclguard'
    },
    {
      id: 'c2-framework',
      title: 'Custom C2 Framework',
      description: 'Lightweight command and control framework for red team operations with advanced evasion techniques.',
      icon: '🎯',
      color: 'purple',
      tech: ['C++', 'C', 'Network Programming'],
      status: 'Research Phase',
      stars: 12,
      forks: 3,
      link: '/projects/c2-framework'
    },
    {
      id: 'linux-rootkit',
      title: 'Linux Rootkit',
      description: 'Educational kernel-level rootkit demonstrating advanced persistence and evasion techniques.',
      icon: '🐧',
      color: 'blue',
      tech: ['C', 'Linux Kernel', 'LKM'],
      status: 'Educational',
      stars: 18,
      forks: 5,
      link: '/projects/linux-rootkit'
    }
  ]

  return (
    <section className="relative min-h-screen py-20">
      <div id="tools" className="absolute top-0 left-0 w-full h-1"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-8">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Custom-built security tools and utilities for red team operations, 
            Active Directory security, and offensive security research.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Project Header */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-${project.color}-500/20 rounded-lg flex items-center justify-center border border-${project.color}-500/30`}>
                    <span className="text-3xl">{project.icon}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-gray-400 mb-1">
                      <span>⭐</span>
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <span>🍴</span>
                      <span>{project.forks}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      project.status === 'Active Development' ? 'bg-green-500 animate-pulse' :
                      project.status === 'Research Phase' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <span className="text-sm text-gray-400">{project.status}</span>
                  </div>
                </div>
              </div>

              {/* Project Footer */}
              <div className="px-8 pb-8">
                <Link href={project.link}>
                  <motion.button
                    className="w-full bg-transparent border border-red-500/50 text-red-400 py-3 px-6 rounded-lg hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 flex items-center justify-center space-x-2 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>View Project</span>
                    <motion.svg
                      className="w-4 h-4"
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
                </Link>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* GitHub Stats */}
        <motion.div
          className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">GitHub Activity</h3>
            <p className="text-gray-400">Live development statistics and contributions</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">54</div>
              <div className="text-gray-300 text-sm">Total Stars</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">16</div>
              <div className="text-gray-300 text-sm">Forks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">127</div>
              <div className="text-gray-300 text-sm">Commits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">8</div>
              <div className="text-gray-300 text-sm">Repositories</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
