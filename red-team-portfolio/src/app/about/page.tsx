'use client'

import { motion } from 'framer-motion'
import { Metadata } from 'next'

const skills = [
  'C Programming',
  'Active Directory',
  'Linux Administration',
  'Python',
  'Network Security',
  'Exploit Development',
  'Kernel Programming',
  'Red Team Operations',
  'Penetration Testing',
  'Security Research'
]

const achievements = [
  { metric: '3', title: 'Production Projects', description: 'ACLGuard, C2 Framework, and Portfolio Site' },
  { metric: '57', title: 'MITRE Techniques', description: 'Interactive ATT&CK coverage matrix' },
  { metric: '25+', title: 'Terminal Commands', description: 'Interactive portfolio exploration' },
  { metric: '100%', title: 'Code Coverage', description: 'All projects with comprehensive testing' },
  { metric: '24/7', title: 'GitHub Activity', description: 'Continuous development and commits' },
  { metric: '∞', title: 'Learning Mindset', description: 'Always expanding security knowledge' }
]

export default function AboutPage() {
  const totalAchievements = 6
  const completedAchievements = 6 // All current achievements completed
  const progressPercentage = (completedAchievements / totalAchievements) * 100

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
                About Me
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Professional consultant transitioning to red team operations through hands-on learning and real-world projects
              </p>
            </motion.div>
          </div>
        </section>

        {/* 90-Day Journey Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-red-400 to-purple-400 bg-clip-text text-transparent">
                90-Day Red Team Journey
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A structured approach to transitioning from professional consulting to red team operations
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-white">{completedAchievements}/{totalAchievements} Achievements</span>
                  <span className="text-lg text-gray-300">{Math.round(progressPercentage)}% Complete</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4 mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-red-600 to-purple-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
                <p className="text-gray-300 text-center">
                  All current achievements completed - continuously expanding
                </p>
              </div>
            </motion.div>

            {/* Journey Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">The Journey So Far</h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-gray-300 mb-6">
                    After years in professional consulting, I decided to pivot into red team operations. 
                    Rather than just studying theory, I'm taking a <strong className="text-red-400">build-first approach</strong> - 
                    creating real tools, conducting actual research, and developing practical skills.
                  </p>
                  <p className="text-lg text-gray-300 mb-6">
                    This achievement-focused approach represents a structured transition from business consulting to offensive security. 
                    Each milestone focuses on hands-on learning, building projects that matter, and developing the technical 
                    expertise needed for red team operations.
                  </p>
                  <p className="text-lg text-gray-300">
                    The goal isn't just to learn about security - it's to <strong className="text-red-400">become a security professional</strong> 
                    who can identify vulnerabilities, build tools to exploit them, and help organizations defend against real threats.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Key Milestones */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Key Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.metric}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-green-500/50 bg-green-900/20 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-2xl font-bold text-red-400 mr-3">{achievement.metric}</span>
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{achievement.title}</h4>
                    <p className="text-gray-300 text-sm">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-red-400 to-purple-400 bg-clip-text text-transparent">
                Technical Skills
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Building expertise through hands-on projects and real-world applications
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.6 + index * 0.05 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center hover:border-red-500/50 transition-all duration-300"
                >
                  <span className="text-white font-medium">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-red-400 to-purple-400 bg-clip-text text-transparent text-center">
                Build &gt; Study
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 mb-6 text-center">
                  My philosophy centers on <strong className="text-red-400">learning through building</strong>. 
                  Rather than collecting certifications, I focus on creating real tools and conducting actual research.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-3">Hands-On Learning</h3>
                    <p className="text-gray-300">
                      Every project is a learning opportunity. Building tools teaches more than reading documentation.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-3">Real-World Focus</h3>
                    <p className="text-gray-300">
                      Solving actual problems with practical solutions that organizations can use today.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-3">Portfolio-First</h3>
                    <p className="text-gray-300">
                      Demonstrating skills through working code and documented research, not just credentials.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-red-400 to-purple-400 bg-clip-text text-transparent">
                Certifications & Learning
              </h2>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">In Progress</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Advanced Red Team Operations Certification</li>
                      <li>• Linux Kernel Development Course</li>
                      <li>• Active Directory Security Specialist</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Completed</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Professional Consulting Experience</li>
                      <li>• C Programming Fundamentals</li>
                      <li>• Network Security Basics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  )
}