'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  totalStars: number
  recentCommits: number
  lastActivity: string
}

export default function LiveGitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true)
        
        // Fetch user data
        const userResponse = await fetch('https://api.github.com/users/foreverlx')
        if (!userResponse.ok) throw new Error('Failed to fetch user data')
        const userData = await userResponse.json()

        // Fetch repositories for star count
        const reposResponse = await fetch('https://api.github.com/users/foreverlx/repos?per_page=100')
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories')
        const reposData = await reposResponse.json()

        // Calculate total stars
        const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)

        // Fetch recent commits (last 30 days)
        const commitsResponse = await fetch('https://api.github.com/users/foreverlx/events?per_page=100')
        if (!commitsResponse.ok) throw new Error('Failed to fetch commits')
        const commitsData = await commitsResponse.json()

        // Count recent commits
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        
        const recentCommits = commitsData.filter((event: any) => {
          if (event.type !== 'PushEvent') return false
          const eventDate = new Date(event.created_at)
          return eventDate > thirtyDaysAgo
        }).length

        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars,
          recentCommits,
          lastActivity: userData.updated_at
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub stats')
        console.error('GitHub API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchGitHubStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <section className="relative min-h-screen py-20">
        <div className="relative z-50 max-w-6xl mx-auto px-6">
          <div className="text-center">
            <motion.h2
              className="text-4xl lg:text-5xl font-light text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Live GitHub Activity
            </motion.h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative min-h-screen py-20">
        <div className="relative z-50 max-w-6xl mx-auto px-6">
          <div className="text-center">
            <motion.h2
              className="text-4xl lg:text-5xl font-light text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Live GitHub Activity
            </motion.h2>
            <div className="text-red-400">
              <p>Unable to load GitHub stats</p>
              <p className="text-sm text-gray-500 mt-2">{error}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!stats) return null

  const statCards = [
    {
      title: 'Public Repositories',
      value: stats.publicRepos,
      icon: '📁',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Stars',
      value: stats.totalStars,
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Recent Commits',
      value: stats.recentCommits,
      icon: '💻',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Followers',
      value: stats.followers,
      icon: '👥',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section className="relative min-h-screen py-20">
      <div className="relative z-50 max-w-6xl mx-auto px-6">
        <div className="text-center">
          <motion.h2
            className="text-4xl lg:text-5xl font-light text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Live GitHub Activity
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Real-time development metrics and contributions
          </motion.p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg hover:border-red-500/50 transition-all duration-300">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-lg group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.title}</div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://github.com/foreverlx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-red-500 text-white font-medium rounded-none border border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View GitHub Profile</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </motion.svg>
            </motion.a>
          </motion.div>

          {/* Last Updated */}
          <motion.p
            className="text-sm text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Last updated: {new Date(stats.lastActivity).toLocaleDateString()}
          </motion.p>
        </div>
      </div>
    </section>
  )
}