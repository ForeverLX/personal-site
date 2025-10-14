'use client'

import { motion } from 'framer-motion'

export default function AboutSection() {
  const skills = [
    { name: 'Active Directory Security', icon: '🔐', level: 'Expert' },
    { name: 'C Programming', icon: '⚡', level: 'Advanced' },
    { name: 'Red Team Operations', icon: '🎯', level: 'Intermediate' },
    { name: 'Penetration Testing', icon: '🛡️', level: 'Intermediate' },
    { name: 'Tool Development', icon: '🔧', level: 'Advanced' },
    { name: 'Security Research', icon: '🔬', level: 'Intermediate' }
  ]

  const certifications = [
    { name: 'OSCP', status: 'In Progress', expected: 'Q2 2025' },
    { name: 'OSEP', status: 'Planned', expected: 'Q3 2025' },
    { name: 'CRTO', status: 'Planned', expected: 'Q4 2025' }
  ]

  return (
    <section className="relative min-h-screen py-20">
      <div id="about" className="absolute top-0 left-0 w-full h-1"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-4xl lg:text-5xl font-light text-white mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        {/* Profile Section */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Profile Photo & Basic Info */}
          <motion.div
            className="lg:col-span-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative mb-8">
              <div className="w-48 h-48 mx-auto lg:mx-0 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-full border-2 border-red-500/30 flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-green-500/20 rounded-full border-2 border-green-500/30 flex items-center justify-center">
                <div className="text-2xl">🚀</div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Darrius Grate</h3>
            <p className="text-red-400 font-medium mb-4">@FOREVERLX</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional consultant transitioning to red team operations. 
              Building the future of offensive security through innovative tools and research.
            </p>
          </motion.div>

          {/* About Story */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-8">
              <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  My transition into red team operations represents the perfect fusion of business acumen 
                  and technical expertise. Coming from a professional consulting background, I bring 
                  strategic thinking and business understanding to cybersecurity challenges.
                </p>
                <p>
                  Currently in the midst of an intensive 90-day red team journey, I'm rapidly building 
                  expertise in Active Directory security, C programming, and offensive security research. 
                  This accelerated learning path is designed to bridge the gap between business strategy 
                  and technical execution.
                </p>
                <p>
                  My philosophy centers on understanding both the attacker's mindset and the defender's 
                  perspective, creating tools and techniques that push the boundaries of what's possible 
                  in cybersecurity while maintaining the highest ethical standards.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Current Status Card */}
        <motion.div
          className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/30 backdrop-blur-sm p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">90-Day Red Team Journey</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">In Progress</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">45+</div>
              <div className="text-gray-300 text-sm">Days Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">12+</div>
              <div className="text-gray-300 text-sm">Tools Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">8+</div>
              <div className="text-gray-300 text-sm">Research Posts</div>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Technical Skills</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6 hover:border-red-500/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <h4 className="text-lg font-medium text-white">{skill.name}</h4>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Proficiency</span>
                  <span className="text-sm font-medium text-red-400">{skill.level}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Timeline */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Certification Roadmap</h3>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="flex items-center justify-between bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                    <span className="text-red-400 font-bold">{cert.name}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">{cert.name}</h4>
                    <p className="text-gray-400 text-sm">Expected: {cert.expected}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    cert.status === 'In Progress' ? 'bg-green-500 animate-pulse' : 
                    cert.status === 'Planned' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-300">{cert.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">Connect With Me</h3>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="https://www.linkedin.com/in/darrius-grate"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-600/20 rounded-full border border-blue-600/30 flex items-center justify-center hover:bg-blue-600/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-blue-400 text-xl">💼</span>
            </motion.a>
            <motion.a
              href="https://github.com/DarriusGrate"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-600/20 rounded-full border border-gray-600/30 flex items-center justify-center hover:bg-gray-600/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-gray-400 text-xl">🐙</span>
            </motion.a>
            <motion.a
              href="https://x.com/DarriusGrate"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-500/20 rounded-full border border-blue-500/30 flex items-center justify-center hover:bg-blue-500/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-blue-400 text-xl">🐦</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
