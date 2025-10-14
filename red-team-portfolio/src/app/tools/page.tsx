import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools | Darrius Grate',
  description: 'Security tools and utilities developed for red team operations and Active Directory security.',
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-galaxy-text mb-8">
          Security Tools
        </h1>
        <p className="text-xl text-galaxy-text-secondary mb-12">
          Custom-built security tools and utilities for red team operations, 
          Active Directory security, and offensive security research.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-effect rounded-lg p-6 hover:glow-effect transition-all duration-300">
            <div className="w-12 h-12 bg-galaxy-red rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-galaxy-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-galaxy-text mb-2">
              ACLGuard
            </h3>
            <p className="text-galaxy-text-secondary mb-4">
              Advanced Active Directory ACL analysis and privilege escalation detection tool.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-galaxy-red/20 text-galaxy-red text-xs rounded">
                C
              </span>
              <span className="px-2 py-1 bg-galaxy-red/20 text-galaxy-red text-xs rounded">
                Active Directory
              </span>
            </div>
          </div>
          
          <div className="glass-effect rounded-lg p-6 hover:glow-effect transition-all duration-300">
            <div className="w-12 h-12 bg-galaxy-purple rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-galaxy-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-galaxy-text mb-2">
              Red Team Toolkit
            </h3>
            <p className="text-galaxy-text-secondary mb-4">
              Comprehensive collection of utilities for red team operations and penetration testing.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-galaxy-red/20 text-galaxy-red text-xs rounded">
                Python
              </span>
              <span className="px-2 py-1 bg-galaxy-red/20 text-galaxy-red text-xs rounded">
                PowerShell
              </span>
            </div>
          </div>
          
          <div className="glass-effect rounded-lg p-6 hover:glow-effect transition-all duration-300">
            <div className="w-12 h-12 bg-galaxy-navy rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-galaxy-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-galaxy-text mb-2">
              Network Scanner
            </h3>
            <p className="text-galaxy-text-secondary mb-4">
              High-performance network reconnaissance and vulnerability scanning tool.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-galaxy-red/20 text-galaxy-red text-xs rounded">
                C
              </span>
              <span className="px-2 py-1 bg-galaxy-red/20 text-galaxy-red text-xs rounded">
                Network Security
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

