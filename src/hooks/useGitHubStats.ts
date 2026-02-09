'use client'

import { useState, useEffect, useCallback } from 'react'
import { GITHUB_CONFIG } from '@/lib/constants'

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
  login: string
}

interface GitHubRepo {
  stargazers_count: number
  name: string
}

interface GitHubEvent {
  id: string
  type: string
  created_at: string
  repo: {
    name: string
  }
  payload?: {
    commits?: Array<{
      message: string
      sha: string
      url: string
    }>
  }
}

interface Commit {
  repo: string
  message: string
  timestamp: string
  url: string
}

interface GitHubStats {
  user: GitHubUser
  commits: Commit[]
  streak: number
  totalStars: number
  totalCommits: number
}

export function useGitHubStats() {
  const [data, setData] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const calculateStreak = useCallback((events: GitHubEvent[]): number => {
    // Filter for push events and group by date
    const pushEvents = events.filter(event => event.type === 'PushEvent')
    const datesWithCommits = new Set(
      pushEvents.map(event => event.created_at.split('T')[0])
    )
    
    // Sort dates in descending order
    const sortedDates = Array.from(datesWithCommits).sort((a, b) => 
      new Date(b).getTime() - new Date(a).getTime()
    )
    
    // Calculate consecutive days from today
    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    for (let i = 0; i < sortedDates.length; i++) {
      const eventDate = new Date(sortedDates[i])
      eventDate.setHours(0, 0, 0, 0)
      
      const daysDiff = Math.floor((today.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysDiff === i) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }, [])

  const extractCommits = useCallback((events: GitHubEvent[]): { commits: Commit[]; totalCommits: number } => {
    const commits: Commit[] = []
    let totalCommits = 0
    
    for (const event of events) {
      if (event.type === 'PushEvent' && event.payload?.commits) {
        totalCommits += event.payload.commits.length
        for (const commit of event.payload.commits) {
          commits.push({
            repo: event.repo.name,
            message: commit.message,
            timestamp: event.created_at,
            url: commit.url
          })
        }
      }
    }
    
    // Sort by timestamp (newest first) and take first 5
    const recentCommits = commits
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5)
    
    return { commits: recentCommits, totalCommits }
  }, [])

  const fetchGitHubData = useCallback(async () => {
    try {
      setError(null)
      
      // Fetch user data, events, and repos in parallel
      const [userResponse, eventsResponse, reposResponse] = await Promise.all([
        fetch(`${GITHUB_CONFIG.API_BASE_URL}/users/${GITHUB_CONFIG.USERNAME}`),
        fetch(`${GITHUB_CONFIG.API_BASE_URL}/users/${GITHUB_CONFIG.USERNAME}/events?per_page=100`),
        fetch(`${GITHUB_CONFIG.API_BASE_URL}/users/${GITHUB_CONFIG.USERNAME}/repos?per_page=100`)
      ])
      
      if (!userResponse.ok || !eventsResponse.ok || !reposResponse.ok) {
        throw new Error(`GitHub API error: ${userResponse.status}`)
      }
      
      const [userData, eventsData, reposData] = await Promise.all([
        userResponse.json(),
        eventsResponse.json(),
        reposResponse.json()
      ])
      
      const { commits, totalCommits } = extractCommits(eventsData)
      const streak = calculateStreak(eventsData)
      
      // Calculate real total stars from repos
      const totalStars = reposData.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0)
      
      setData({
        user: userData,
        commits,
        streak,
        totalStars,
        totalCommits
      })
    } catch (err) {
      console.error('Failed to fetch GitHub data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data')
    } finally {
      setLoading(false)
    }
  }, [extractCommits, calculateStreak])

  useEffect(() => {
    fetchGitHubData()
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchGitHubData, GITHUB_CONFIG.REFRESH_INTERVAL)
    
    return () => clearInterval(interval)
  }, [fetchGitHubData])

  const retry = useCallback(() => {
    setLoading(true)
    fetchGitHubData()
  }, [fetchGitHubData])

  return {
    data,
    loading,
    error,
    retry
  }
}
