/**
 * Application Constants
 * 
 * Centralized configuration values for maintainability and consistency.
 * All magic numbers and configuration values should be defined here.
 */

// Terminal Configuration
export const TERMINAL_CONFIG = {
  WIDTH: 75,
  TYPEWRITER_DELAY: 50,
  PROMPT_DELAY: 100,
} as const

// Tour Mode Configuration
export const TOUR_CONFIG = {
  STEP_DELAY: 500,
  TOTAL_STEPS: 9,
  TYPEWRITER_SPEED: 30,
} as const

// GitHub Integration
export const GITHUB_CONFIG = {
  USERNAME: 'ForeverLX',
  REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes in milliseconds
  API_BASE_URL: 'https://api.github.com',
} as const

// Formspree Configuration
export const FORMSPREE_CONFIG = {
  ENDPOINT_ID: process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mjkalgaj',
} as const

// Animation Durations
export const ANIMATION_CONFIG = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  INTRO_DELAY: 800,
} as const

// Layout Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

// Color Themes
export const THEME_COLORS = {
  PRIMARY: '#ef4444', // red-500
  SECONDARY: '#8b5cf6', // violet-500
  SUCCESS: '#10b981', // emerald-500
  WARNING: '#f59e0b', // amber-500
  ERROR: '#ef4444', // red-500
} as const

// Content Configuration
export const CONTENT_CONFIG = {
  ACHIEVEMENTS: {
    PROJECTS: 3,
    MITRE_TECHNIQUES: 57,
    TERMINAL_COMMANDS: 25,
  },
  SOCIAL_LINKS: {
    GITHUB: 'https://github.com/ForeverLX',
    LINKEDIN: 'https://www.linkedin.com/in/darrius-grate',
    TWITTER: 'https://x.com/DarriusGrate',
    EMAIL: 'contact@darriusgrate.com',
  },
} as const

// Security Headers Configuration
export const SECURITY_HEADERS = {
  CSP: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.github.com https://formspree.io;",
  FRAME_OPTIONS: 'DENY',
  CONTENT_TYPE_OPTIONS: 'nosniff',
  REFERRER_POLICY: 'strict-origin-when-cross-origin',
  PERMISSIONS_POLICY: 'camera=(), microphone=(), geolocation=()',
} as const

