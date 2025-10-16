'use client'

import { motion } from 'framer-motion'

const services = [
  {
    id: 'ad-assessment',
    title: 'AD Security Assessment',
    price: '$2,500 - $5,000',
    icon: '🏢',
    deliverables: [
      'Attack path analysis',
      'Privilege escalation vectors',
      'Remediation roadmap',
      'Executive summary report'
    ],
    description: 'Comprehensive Active Directory security assessment to identify vulnerabilities and attack paths in your environment.'
  },
  {
    id: 'network-pentest',
    title: 'Network Penetration Test',
    price: '$3,000 - $6,000',
    icon: '🌐',
    deliverables: [
      'Full network scan',
      'Exploit attempts',
      'Executive report',
      'Technical remediation guide'
    ],
    description: 'External and internal network penetration testing to identify security weaknesses and potential attack vectors.'
  },
  {
    id: 'web-app-assessment',
    title: 'Web App Assessment',
    price: '$2,000 - $4,000',
    icon: '🔍',
    deliverables: [
      'OWASP Top 10 testing',
      'Auth bypass attempts',
      'Detailed findings report',
      'Secure coding recommendations'
    ],
    description: 'Thorough web application security assessment focusing on common vulnerabilities and attack patterns.'
  },
  {
    id: 'custom-tooling',
    title: 'Custom Tooling',
    price: 'Quote-based',
    icon: '⚙️',
    deliverables: [
      'Bespoke security tools',
      'Automation scripts',
      'Source code provided',
      'Documentation & training'
    ],
    description: 'Custom security tools and automation scripts tailored to your specific needs and environment.'
  }
]

const valueProps = [
  {
    title: 'Real-World Experience',
    description: 'Hands-on experience with actual red team operations and security research, not just theoretical knowledge.'
  },
  {
    title: 'Build-First Approach',
    description: 'I believe in building real tools and solutions over collecting certifications. Every project is a learning opportunity.'
  },
  {
    title: 'Transparent Process',
    description: 'Clear communication throughout the engagement with detailed reports and actionable recommendations.'
  }
]

export default function ServicesPage() {
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
                Services
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Professional security assessments and custom tooling to strengthen your organization's defenses
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 h-full flex flex-col hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <span className="text-4xl">{service.icon}</span>
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-lg font-semibold text-red-400 mt-1">
                            {service.price}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* Deliverables */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">What You Get:</h4>
                      <ul className="space-y-2">
                        {service.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-center text-gray-300">
                            <svg className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                      Get Started
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Work With Me Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-red-400 to-purple-400 bg-clip-text text-transparent">
                Why Work With Me
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Combining technical expertise with a practical, results-driven approach
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valueProps.map((prop, index) => (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 h-full">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {prop.title}
                    </h3>
                    <p className="text-gray-300">
                      {prop.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-red-400 to-purple-400 bg-clip-text text-transparent">
                How It Works
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Discovery', description: 'Initial consultation to understand your needs and scope' },
                { step: '02', title: 'Planning', description: 'Detailed engagement plan with timelines and deliverables' },
                { step: '03', title: 'Execution', description: 'Professional assessment with real-time communication' },
                { step: '04', title: 'Delivery', description: 'Comprehensive report with actionable recommendations' }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 h-full">
                    <div className="text-4xl font-bold text-red-400 mb-4">{item.step}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-red-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Strengthen Your Security?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Let's discuss how I can help secure your organization with professional assessments and custom solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  Get a Quote
                </button>
                <button className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:border-red-500 hover:text-red-400 transition-all duration-300">
                  View My Work
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  )
}