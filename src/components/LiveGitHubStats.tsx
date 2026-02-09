'use client'

import { motion } from 'framer-motion'
import { useGitHubStats } from '@/hooks/useGitHubStats'

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return date.toLocaleDateString()
}

function LoadingSkeleton() {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-red-500/20 rounded-lg p-5 my-8">
      <div className="animate-pulse">
        {/* Header */}
        <div className="h-5 bg-gray-700/50 rounded w-56 mb-5"></div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-black/30 border border-red-500/30 rounded-lg p-4">
              <div className="h-6 bg-gray-700/50 rounded w-12 mb-2"></div>
              <div className="h-3 bg-gray-700/50 rounded w-16"></div>
            </div>
          ))}
        </div>
        
        {/* Commits List */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-700/50 rounded w-28 mb-3"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-black/20 border border-red-500/10 rounded p-3">
              <div className="h-3 bg-gray-700/50 rounded w-40 mb-2"></div>
              <div className="h-3 bg-gray-700/50 rounded w-28"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-red-500/20 rounded-lg p-5 my-8">
      <div className="text-center">
        <div className="text-red-400 text-lg mb-4">⚠️ Failed to load GitHub data</div>
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, ease: "easeOut" }}
      >
        {value.toLocaleString()}
      </motion.span>
    </motion.span>
  )
}

function StreakProgress({ streak }: { streak: number }) {
  const progress = Math.min((streak / 90) * 100, 100)
  const getProgressColor = () => {
    if (progress < 30) return 'from-red-500 to-red-400'
    if (progress < 60) return 'from-red-500 to-yellow-400'
    return 'from-yellow-500 to-green-400'
  }

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-700/30 rounded-full h-1.5">
        <motion.div
          className={`h-1.5 rounded-full bg-gradient-to-r ${getProgressColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
      <div className="text-xs text-gray-400 mt-1">
        {streak} of 90 days
      </div>
    </div>
  )
}

function truncateText(text: string, maxLength: number = 60): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export default function LiveGitHubStats() {
  const { data, loading, error, retry } = useGitHubStats()

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorState error={error} onRetry={retry} />
  }

  if (!data) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-black/40 backdrop-blur-sm border border-red-500/20 rounded-lg p-5 my-8"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">
          GitHub Activity - 90 Day Journey
        </h2>
        <p className="text-gray-400 text-sm">Live coding progress and contributions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Commit Streak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="bg-black/30 border border-red-500/30 rounded-lg p-4 text-center hover:border-red-500/50 transition-all duration-300"
        >
          <div className="text-2xl font-bold text-red-400 mb-1">
            <AnimatedNumber value={data.streak} />
          </div>
          <div className="text-gray-300 text-xs">Day{data.streak !== 1 ? 's' : ''} Streak</div>
          <StreakProgress streak={data.streak} />
        </motion.div>

        {/* Public Repos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="bg-black/30 border border-red-500/30 rounded-lg p-4 text-center hover:border-red-500/50 transition-all duration-300"
        >
          <div className="text-2xl font-bold text-white mb-1">
            <AnimatedNumber value={data.user.public_repos} />
          </div>
          <div className="text-gray-300 text-xs">Repositories</div>
        </motion.div>

        {/* Total Stars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className="bg-black/30 border border-red-500/30 rounded-lg p-4 text-center hover:border-red-500/50 transition-all duration-300"
        >
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            <AnimatedNumber value={data.totalStars} />
          </div>
          <div className="text-gray-300 text-xs">Total Stars</div>
        </motion.div>

        {/* Followers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="bg-black/30 border border-red-500/30 rounded-lg p-4 text-center hover:border-red-500/50 transition-all duration-300"
        >
          <div className="text-2xl font-bold text-blue-400 mb-1">
            <AnimatedNumber value={data.user.followers} />
          </div>
          <div className="text-gray-300 text-xs">Followers</div>
        </motion.div>
      </div>

      {/* Recent Commits */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Recent Commits</h3>
        <div className="space-y-2">
          {data.commits.map((commit, index) => {
            const truncatedMessage = truncateText(commit.message)
            const isTruncated = commit.message.length > 60
            
            return (
              <motion.a
                key={`${commit.repo}-${commit.timestamp}`}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="block bg-black/20 border border-red-500/10 rounded-lg p-3 hover:bg-black/30 hover:border-red-500/30 transition-all duration-300 group"
                title={isTruncated ? commit.message : undefined}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">
                      {commit.repo} · {formatRelativeTime(commit.timestamp)}
                    </div>
                    <div className="text-white group-hover:text-red-400 transition-colors text-sm">
                      {truncatedMessage}
                    </div>
                  </div>
                  <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-xs">
          Data updates every 5 minutes • 
          <a 
            href="https://github.com/ForeverLX" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 ml-1"
          >
            View on GitHub
          </a>
        </p>
      </div>
    </motion.div>
  )
}