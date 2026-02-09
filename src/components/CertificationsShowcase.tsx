'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const certifications = [
  {
    id: 'ad-rts',
    name: 'Active Directory Red Team Specialist',
    issuer: 'CyberWarfare Labs',
    image: '/certificates/AD-RTS-Certificate.png',
    date: 'Nov 2025'
  },
  {
    id: 'capt',
    name: 'Certified Associate Penetration Tester',
    issuer: 'HackViser',
    image: '/certificates/CAPT-Certificate.png',
    date: 'Dec 2025'
  },
  {
    id: 'cosj',
    name: 'Certified Offensive Security Junior',
    issuer: 'RedTeam Ops',
    image: '/certificates/COSJ.png',
    date: 'Oct 2025'
  }
]

const inProgress = [
  'MCRTA (Multi-Cloud Red Team Analyst)',
  'CRTA (Certified Red Team Analyst)',
  'CRT-ID (Red Team Infra Dev)',
  'BTF (Blue Team Fundamentals)',
  'PTF (Purple Teaming Fundamentals)',
  'CPIA (Process Injection Analyst)',
  'CRT-COI (CredOps Infiltrator)',
  'CWSE (Certified Web Security Expert)'
]

export default function CertificationsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certifications.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const active = certifications[activeIndex]

  return (
    <section className="relative py-20">
      <div id="certifications" className="absolute top-0 left-0 w-full h-1"></div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
            Certifications
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Verified achievements and ongoing coursework focused on offensive security.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Currently Displaying</p>
                <h3 className="text-2xl font-semibold text-white">{active.name}</h3>
                <p className="text-gray-400">{active.issuer} • {active.date}</p>
              </div>
              <div className="flex space-x-2">
                {certifications.map((cert, idx) => (
                  <button
                    key={cert.id}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Show ${cert.name}`}
                    className={`h-2 w-8 rounded-full transition-colors ${idx == activeIndex ? 'bg-red-500' : 'bg-gray-700'}`}
                  />
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-700 bg-black">
              <Image
                src={active.image}
                alt={`${active.name} certificate`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">In Progress (8)</h3>
            <ul className="space-y-2 text-gray-300">
              {inProgress.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm mt-6">
              All in-progress coursework is from CyberWarfare Labs.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
