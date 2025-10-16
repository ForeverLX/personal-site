'use client'

import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class TerminalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error for debugging
    console.error('Terminal Error Boundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-gray-900/50 border border-red-500/50 rounded-lg p-8 text-center max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-500 mb-2">
              Terminal Unavailable
            </h2>
            <p className="text-gray-400 mb-4">
              The interactive terminal encountered an error. Other features are still available.
            </p>
            {this.state.error && (
              <details className="text-left bg-gray-800/50 rounded p-3 mb-4 text-sm">
                <summary className="cursor-pointer text-gray-300 hover:text-white">
                  Technical Details
                </summary>
                <pre className="mt-2 text-red-300 text-xs overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={this.handleRetry}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-200 font-medium"
            >
              Try Again
            </button>
            <a 
              href="#projects"
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors duration-200 font-medium"
            >
              View Projects Instead
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
