import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Darrius Grate',
  description: 'Learn about my journey from professional consulting to red team operations.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-galaxy-text mb-8">
          About Me
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-galaxy-text-secondary mb-8">
            I'm Darrius Grate, a professional consultant transitioning into red team operations. 
            My journey represents the perfect blend of business acumen and technical expertise.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-effect rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-galaxy-text mb-4">
                Professional Background
              </h2>
              <p className="text-galaxy-text-secondary">
                Years of experience in professional consulting, bringing strategic thinking 
                and business understanding to cybersecurity challenges.
              </p>
            </div>
            
            <div className="glass-effect rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-galaxy-text mb-4">
                Technical Expertise
              </h2>
              <p className="text-galaxy-text-secondary">
                Specialized in Active Directory security, C programming, and building 
                cutting-edge security tools for red team operations.
              </p>
            </div>
          </div>
          
          <div className="glass-effect rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-galaxy-text mb-4">
              Mission
            </h2>
            <p className="text-galaxy-text-secondary">
              Bridging the gap between theoretical cybersecurity knowledge and practical 
              implementation. I focus on building tools that matter, conducting research 
              that advances the field, and helping organizations understand their security 
              posture from an attacker's perspective.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

