import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research | Darrius Grate',
  description: 'Technical research, security findings, and deep-dive analysis from red team operations.',
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-galaxy-text mb-8">
          Research & Analysis
        </h1>
        <p className="text-xl text-galaxy-text-secondary mb-12">
          Deep-dive technical research, security findings, and analysis from red team operations.
        </p>
        
        {/* Placeholder for future MDX content */}
        <div className="space-y-8">
          <div className="glass-effect rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-galaxy-text mb-4">
              Coming Soon: Active Directory Security Research
            </h2>
            <p className="text-galaxy-text-secondary">
              Detailed analysis of Active Directory attack vectors, defensive techniques, and tool development insights.
            </p>
          </div>
          
          <div className="glass-effect rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-galaxy-text mb-4">
              Coming Soon: C Programming for Security Tools
            </h2>
            <p className="text-galaxy-text-secondary">
              Technical deep-dives into building high-performance security tools using C programming.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

