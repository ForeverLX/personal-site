'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MitreMatrix } from '@/components/MitreMatrix/MitreMatrix'

const projects = [
  {
    id: 'aclguard',
    title: 'ACLGuard v2.0',
    status: 'Active Development',
    statusColor: 'bg-green-500',
    tech: ['C', 'Linux Kernel', 'POSIX ACLs'],
    description: 'Advanced Linux kernel module for real-time POSIX ACL monitoring and enforcement. Provides granular access control auditing and protection against privilege escalation attacks.',
    link: '/projects/aclguard',
    icon: '🛡️'
  },
  {
    id: 'c2-framework',
    title: 'Custom C2 Framework',
    status: 'In Progress',
    statusColor: 'bg-yellow-500',
    tech: ['C', 'Networking', 'Encryption', 'Obfuscation'],
    description: 'Developing a highly customizable command and control framework for red team operations, focusing on stealth and modularity.',
    link: '/projects/c2-framework',
    icon: '📡'
  },
  {
    id: 'linux-rootkit',
    title: 'Linux Rootkit',
    status: 'Planned',
    statusColor: 'bg-red-500',
    tech: ['C', 'Kernel Modules', 'Stealth', 'Persistence'],
    description: 'Research and development into advanced Linux kernel-mode rootkits for post-exploitation scenarios.',
    link: '/projects/linux-rootkit',
    icon: '👻'
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        className="pt-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto py-12">
          <motion.h1
            className="text-4xl lg:text-5xl font-bold text-center text-white mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            My Projects
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 h-full flex flex-col hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                  >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{project.icon}</span>
                  <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                </div>
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>
                    <p className="text-gray-300 mb-6 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200">
                      {tech}
                    </span>
                  ))}
                </div>
                    <Link href={project.link} passHref>
                      <motion.button
                        className="mt-auto w-full bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Details
                      </motion.button>
                    </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* MITRE ATT&CK Coverage Section */}
      <MitreMatrix />
    </div>
  )
}