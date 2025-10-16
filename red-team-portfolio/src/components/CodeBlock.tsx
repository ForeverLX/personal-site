'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
  showLineNumbers?: boolean
}

export default function CodeBlock({ 
  code, 
  language, 
  title, 
  showLineNumbers = true 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      'c': '#00599C',
      'cpp': '#00599C',
      'csharp': '#239120',
      'powershell': '#012456',
      'bash': '#4EAA25',
      'python': '#3776ab',
      'javascript': '#F7DF1E',
      'typescript': '#3178C6',
      'json': '#000000',
      'xml': '#FF6600',
      'yaml': '#CB171E',
      'sql': '#336791'
    }
    return colors[lang.toLowerCase()] || '#666666'
  }

  const lines = code.split('\n')

  return (
    <motion.div
      className="relative bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          {title && (
            <h4 className="text-sm font-medium text-gray-300">{title}</h4>
          )}
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getLanguageColor(language) }}
            />
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {language}
            </span>
          </div>
        </div>
        
        <motion.button
          onClick={copyToClipboard}
          className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors text-xs text-gray-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <>
              <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Code Content */}
      <div className="relative">
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm leading-relaxed">
            {showLineNumbers ? (
              <div className="flex">
                <div className="flex-shrink-0 pr-4 text-gray-600 select-none">
                  {lines.map((_, index) => (
                    <div key={index} className="leading-relaxed">
                      {String(index + 1).padStart(2, ' ')}
                    </div>
                  ))}
                </div>
                <div className="flex-1 text-gray-300">
                  {lines.map((line, index) => (
                    <div key={index} className="leading-relaxed">
                      {line || '\u00A0'}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-300">
                {lines.map((line, index) => (
                  <div key={index} className="leading-relaxed">
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            )}
          </code>
        </pre>
      </div>
    </motion.div>
  )
}




