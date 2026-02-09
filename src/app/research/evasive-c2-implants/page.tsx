'use client'

import { motion } from 'framer-motion'
import DetailPageLayout from '@/components/DetailPageLayout'
import Callout from '@/components/Callout'

export default function WriteupsSpotlightPost() {
  return (
    <DetailPageLayout
      title="Writeups Spotlight"
      subtitle="Reverse engineering and exploitation writeups"
      breadcrumb={{ label: 'Research', href: '/#research' }}
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Callout
            type="info"
            title="Focus"
          >
            This slot now highlights reverse engineering and binary exploitation writeups with clear reasoning, evidence, and mitigations.
          </Callout>
        </motion.div>

        <section className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">What to expect</h2>
          <ul className="text-gray-300 space-y-3">
            <li>• GDB‑driven analysis and strings‑first triage</li>
            <li>• Shellcode challenges with ABI‑aware reasoning</li>
            <li>• Verification steps and proof artifacts</li>
            <li>• Defensive takeaways when applicable</li>
          </ul>
        </section>

        <section className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Where to read</h2>
          <p className="text-gray-300 leading-relaxed">
            The full collection lives in the security‑portfolio repository alongside other writeups and lab notes.
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/ForeverLX/security-portfolio"
              className="text-red-400 hover:text-red-300 underline"
            >
              Open security‑portfolio →
            </a>
          </div>
        </section>
      </div>
    </DetailPageLayout>
  )
}
