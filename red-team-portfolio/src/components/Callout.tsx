'use client'

import { motion } from 'framer-motion'

interface CalloutProps {
  type: 'info' | 'warning' | 'success' | 'error'
  title?: string
  children: React.ReactNode
  icon?: React.ReactNode
}

export default function Callout({ type, title, children, icon }: CalloutProps) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'info':
        return {
          container: 'bg-blue-500/10 border-blue-500/30',
          icon: 'text-blue-400',
          title: 'text-blue-300',
          defaultIcon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      case 'warning':
        return {
          container: 'bg-yellow-500/10 border-yellow-500/30',
          icon: 'text-yellow-400',
          title: 'text-yellow-300',
          defaultIcon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )
        }
      case 'success':
        return {
          container: 'bg-green-500/10 border-green-500/30',
          icon: 'text-green-400',
          title: 'text-green-300',
          defaultIcon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      case 'error':
        return {
          container: 'bg-red-500/10 border-red-500/30',
          icon: 'text-red-400',
          title: 'text-red-300',
          defaultIcon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      default:
        return {
          container: 'bg-gray-500/10 border-gray-500/30',
          icon: 'text-gray-400',
          title: 'text-gray-300',
          defaultIcon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
    }
  }

  const styles = getTypeStyles(type)

  return (
    <motion.div
      className={`relative rounded-lg border p-4 ${styles.container}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 ${styles.icon}`}>
          {icon || styles.defaultIcon}
        </div>
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`text-sm font-medium mb-2 ${styles.title}`}>
              {title}
            </h4>
          )}
          <div className="text-sm text-gray-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}




