'use client'

import { motion } from 'framer-motion'
export default function ServicesSection() {
  return (
    <section className="relative min-h-screen py-20">
      <div id="services" className="absolute top-0 left-0 w-full h-1"></div>
      
      {/* Subtle Network Visualization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full opacity-5">
          {[...Array(15)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${(i * 7) % 100}%`}
              y1={`${(i * 11) % 100}%`}
              x2={`${(i * 13) % 100}%`}
              y2={`${(i * 17) % 100}%`}
              stroke="#ff0040"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
              }}
            />
          ))}
        </svg>
      </div>
      <div className="text-center">
        <motion.h2
          className="text-4xl lg:text-5xl font-light text-white mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Services
        </motion.h2>
        
        <motion.p
          className="text-lg text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Comprehensive security services designed to help organizations understand 
          and improve their security posture from an attacker's perspective.
        </motion.p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            className="p-8 bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-white mb-4">Penetration Testing</h3>
            <p className="text-gray-300 mb-6">
              Comprehensive security assessments to identify vulnerabilities and 
              provide actionable remediation strategies.
            </p>
            <ul className="space-y-2 text-gray-400 text-left mb-6">
              <li>• Web Application Testing</li>
              <li>• Network Infrastructure Assessment</li>
              <li>• Social Engineering Campaigns</li>
              <li>• Physical Security Testing</li>
            </ul>
            <div className="text-center">
              <span className="text-red-400 font-bold text-lg">$2,000 - $6,000</span>
            </div>
          </motion.div>
          
          <motion.div
            className="p-8 bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-white mb-4">Red Team Operations</h3>
            <p className="text-gray-300 mb-6">
              Advanced persistent threat simulation to test your organization's 
              detection and response capabilities.
            </p>
            <ul className="space-y-2 text-gray-400 text-left mb-6">
              <li>• Multi-Vector Attack Campaigns</li>
              <li>• Active Directory Compromise</li>
              <li>• Lateral Movement Testing</li>
              <li>• Data Exfiltration Simulation</li>
            </ul>
            <div className="text-center">
              <span className="text-red-400 font-bold text-lg">$5,000 - $15,000</span>
            </div>
          </motion.div>
          
          <motion.div
            className="p-8 bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-white mb-4">Security Consulting</h3>
            <p className="text-gray-300 mb-6">
              Strategic security guidance to help organizations build robust 
              security programs and incident response capabilities.
            </p>
            <ul className="space-y-2 text-gray-400 text-left mb-6">
              <li>• Security Program Development</li>
              <li>• Incident Response Planning</li>
              <li>• Security Architecture Review</li>
              <li>• Training & Awareness Programs</li>
            </ul>
            <div className="text-center">
              <span className="text-red-400 font-bold text-lg">Quote-based</span>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => {
              window.location.href = '/services'
            }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Services</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
