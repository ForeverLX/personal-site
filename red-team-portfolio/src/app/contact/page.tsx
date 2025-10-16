'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const contactMethods = [
  {
    platform: 'Email',
    value: 'darrius@example.com',
    icon: '📧',
    description: 'Best for detailed inquiries and project discussions',
    link: 'mailto:darrius@example.com'
  },
  {
    platform: 'Twitter/X',
    value: '@foreverlx',
    icon: '🐦',
    description: 'Follow for updates on projects and security research',
    link: 'https://x.com/foreverlx'
  },
  {
    platform: 'GitHub',
    value: 'github.com/foreverlx',
    icon: '💻',
    description: 'View my code, projects, and contributions',
    link: 'https://github.com/foreverlx'
  },
  {
    platform: 'LinkedIn',
    value: 'linkedin.com/in/darrius-grate',
    icon: '💼',
    description: 'Connect professionally',
    link: 'https://www.linkedin.com/in/darrius-grate'
  }
]

const trustPoints = [
  {
    title: 'Professional Experience',
    description: 'Years of consulting experience with a focus on delivering results and clear communication.'
  },
  {
    title: 'Transparent Process',
    description: 'Clear timelines, regular updates, and detailed reports with actionable recommendations.'
  },
  {
    title: 'Hands-On Approach',
    description: 'Building real tools and conducting actual research, not just theoretical knowledge.'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Use environment variable for Formspree endpoint
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mjkalgaj';
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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
                Let's Work Together
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ready to strengthen your security posture? Let's discuss how I can help with professional assessments and custom solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-900/50 border border-green-500/50 rounded-lg">
                      <p className="text-green-400">Message sent successfully! I'll get back to you within 24 hours.</p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg">
                      <p className="text-red-400">There was an error sending your message. Please try again or contact me directly.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="project">Project Inquiry</option>
                        <option value="service">Service Request</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none"
                        placeholder="Tell me about your project or security needs..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Contact Methods */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    {contactMethods.map((method, index) => (
                      <motion.div
                        key={method.platform}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{method.platform}</h3>
                          <a 
                            href={method.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-red-400 font-medium hover:text-red-300 transition-colors"
                          >
                            {method.value}
                          </a>
                          <p className="text-gray-300 text-sm">{method.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Response Time</h3>
                  <p className="text-gray-300 mb-4">
                    I typically respond to inquiries within <strong className="text-red-400">24 hours</strong> during business days.
                  </p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• <strong>General inquiries:</strong> 24-48 hours</p>
                    <p>• <strong>Project discussions:</strong> 12-24 hours</p>
                    <p>• <strong>Urgent security issues:</strong> Same day</p>
                  </div>
                </div>

                {/* What to Expect */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Initial consultation to understand your needs
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Detailed proposal with timeline and deliverables
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Regular updates throughout the engagement
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Comprehensive report with actionable recommendations
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Building Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-red-400 to-purple-400 bg-clip-text text-transparent">
                Why Work With Me
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Professional experience meets hands-on technical expertise
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trustPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
                >
                  <h3 className="text-xl font-bold text-white mb-4">{point.title}</h3>
                  <p className="text-gray-300">{point.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
  )
}