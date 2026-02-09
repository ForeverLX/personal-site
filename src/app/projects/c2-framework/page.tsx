'use client'

import { motion } from 'framer-motion'
import DetailPageLayout from '@/components/DetailPageLayout'
import Callout from '@/components/Callout'

export default function C2FrameworkProjectPage() {
  const upcomingTopics = [
    'Active Directory attack chains and tradecraft breakdowns',
    'Binary exploitation walkthroughs with reasoning-first methodology',
    'Tooling deep dives: ACLGuard, lab automation, and workflow notes',
    'Writeup reviews: what worked, what failed, and why'
  ]

  return (
    <DetailPageLayout
      title="YouTube Channel (Coming Soon)"
      subtitle="Recorded breakdowns of real offensive security workflows"
      breadcrumb={{ label: 'Projects', href: '/#projects' }}
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mr-6">
              <span className="text-4xl">🎬</span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                YouTube Channel
              </h1>
              <p className="text-xl text-gray-300">
                Coming soon — deep technical walkthroughs and operator notes
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 text-sm font-medium">In planning</span>
            </div>
            <div className="text-gray-500">•</div>
            <div className="text-sm text-gray-400">Content roadmap in progress</div>
          </div>
        </motion.div>

        <div className="space-y-10">
          <Callout
            type="info"
            title="Why this channel"
          >
            I want a place to document hard‑won lessons from labs and real tooling work — with the actual reasoning,
            tradeoffs, and verification steps that don’t fit in short writeups.
          </Callout>

          <section className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Planned coverage</h2>
            <ul className="text-gray-300 space-y-3">
              {upcomingTopics.map((topic) => (
                <li key={topic}>• {topic}</li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Status</h2>
            <p className="text-gray-300 leading-relaxed">
              The channel is in pre‑production. Once the first series is ready, this page will include links
              to the playlist and the release cadence.
            </p>
          </section>
        </div>
      </div>
    </DetailPageLayout>
  )
}
