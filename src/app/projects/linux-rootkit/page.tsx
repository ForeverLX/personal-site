'use client'

import { motion } from 'framer-motion'
import DetailPageLayout from '@/components/DetailPageLayout'
import Callout from '@/components/Callout'

export default function ReverseEngineeringProjectPage() {
  const focusAreas = [
    'Binary reversing with GDB and strings-first triage',
    'Shellcode exercises and ABI-aware payloads',
    'Writeup quality: evidence, reasoning, and verification',
    'Pattern recognition for common challenge types'
  ]

  return (
    <DetailPageLayout
      title="Reverse Engineering & Binary Exploitation"
      subtitle="Writeups, walkthroughs, and methodology notes"
      breadcrumb={{ label: 'Projects', href: '/#projects' }}
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30 mr-6">
              <span className="text-4xl">🧩</span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                Reverse Engineering & Binary Exploitation
              </h1>
              <p className="text-xl text-gray-300">
                Practical writeups with clear reasoning and verification steps
              </p>
            </div>
          </div>
        </motion.div>

        <Callout
          type="info"
          title="Current focus"
          description="I document reversing and shellcode challenges in a writeup-first format. The goal is to capture real reasoning, not just answers."
        />

        <section className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Focus areas</h2>
          <ul className="text-gray-300 space-y-3">
            {focusAreas.map((area) => (
              <li key={area}>• {area}</li>
            ))}
          </ul>
        </section>

        <section className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Where to read</h2>
          <p className="text-gray-300 leading-relaxed">
            The latest reversing and binary exploitation writeups live in the security portfolio repository.
            I keep those artifacts in a single place so they stay consistent and review-ready.
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/ForeverLX/security-portfolio"
              className="text-red-400 hover:text-red-300 underline"
            >
              View security-portfolio writeups →
            </a>
          </div>
        </section>
      </div>
    </DetailPageLayout>
  )
}
