'use client'

import { motion } from 'framer-motion'
import DetailPageLayout from '@/components/DetailPageLayout'
import Callout from '@/components/Callout'

export default function OffsecWorkstationProjectPage() {
  const focusAreas = [
    'Stable networking and repeatable performance tuning',
    'Tool inventory with verified PATH locations',
    'Sway + Wayland workflow optimizations',
    'Documentation-first upgrades and audit trail'
  ]

  const docs = [
    'System snapshot history and environment summary',
    'Tools inventory with category breakdowns',
    'Performance and network optimization notes'
  ]

  return (
    <DetailPageLayout
      title="Offsec Workstation"
      subtitle="Arch + Sway build focused on stability, speed, and documented tradecraft"
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
            <div className="w-20 h-20 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30 mr-6">
              <span className="text-4xl">🖥️</span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                Offsec Workstation
              </h1>
              <p className="text-xl text-gray-300">
                Documented build powering labs, writeups, and red-team workflows
              </p>
            </div>
          </div>
        </motion.div>

        <Callout type="info" title="Why this matters">
          This workstation is the foundation of my offensive security work. Every change is documented so the setup
          stays reproducible, auditable, and easy to evolve as my toolchain grows.
        </Callout>

        <section className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Focus areas</h2>
          <ul className="text-gray-300 space-y-3">
            {focusAreas.map((area) => (
              <li key={area}>• {area}</li>
            ))}
          </ul>
        </section>

        <section className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">What’s documented</h2>
          <ul className="text-gray-300 space-y-3">
            {docs.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>

        <section className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Repository</h2>
          <p className="text-gray-300 leading-relaxed">
            The full build notes, audits, and tool inventory live in the public repository. I keep the documentation
            tight so it can be reviewed quickly and updated frequently.
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/ForeverLX/offsec-workstation"
              className="text-red-400 hover:text-red-300 underline"
            >
              View offsec-workstation repo →
            </a>
          </div>
        </section>
      </div>
    </DetailPageLayout>
  )
}
