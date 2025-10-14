import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | Darrius Grate',
  description: 'Professional penetration testing and red team services for organizations.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-galaxy-text mb-8">
          Professional Services
        </h1>
        <p className="text-xl text-galaxy-text-secondary mb-12">
          Comprehensive security services designed to help organizations understand 
          and improve their security posture from an attacker's perspective.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="glass-effect rounded-lg p-8 hover:glow-effect transition-all duration-300">
            <div className="w-16 h-16 bg-galaxy-red rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-galaxy-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-galaxy-text mb-4">
              Penetration Testing
            </h3>
            <p className="text-galaxy-text-secondary mb-6">
              Comprehensive security assessments to identify vulnerabilities and 
              provide actionable remediation strategies.
            </p>
            <ul className="space-y-2 text-galaxy-text-secondary">
              <li>• Web Application Testing</li>
              <li>• Network Infrastructure Assessment</li>
              <li>• Social Engineering Campaigns</li>
              <li>• Physical Security Testing</li>
            </ul>
          </div>
          
          <div className="glass-effect rounded-lg p-8 hover:glow-effect transition-all duration-300">
            <div className="w-16 h-16 bg-galaxy-purple rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-galaxy-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-galaxy-text mb-4">
              Red Team Operations
            </h3>
            <p className="text-galaxy-text-secondary mb-6">
              Advanced persistent threat simulation to test your organization's 
              detection and response capabilities.
            </p>
            <ul className="space-y-2 text-galaxy-text-secondary">
              <li>• Multi-Vector Attack Campaigns</li>
              <li>• Active Directory Compromise</li>
              <li>• Lateral Movement Testing</li>
              <li>• Data Exfiltration Simulation</li>
            </ul>
          </div>
          
          <div className="glass-effect rounded-lg p-8 hover:glow-effect transition-all duration-300">
            <div className="w-16 h-16 bg-galaxy-navy rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-galaxy-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-galaxy-text mb-4">
              Security Consulting
            </h3>
            <p className="text-galaxy-text-secondary mb-6">
              Strategic security guidance to help organizations build robust 
              security programs and incident response capabilities.
            </p>
            <ul className="space-y-2 text-galaxy-text-secondary">
              <li>• Security Program Development</li>
              <li>• Incident Response Planning</li>
              <li>• Security Architecture Review</li>
              <li>• Training & Awareness Programs</li>
            </ul>
          </div>
        </div>
        
        <div className="glass-effect rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-galaxy-text mb-4">
            Ready to Secure Your Organization?
          </h2>
          <p className="text-xl text-galaxy-text-secondary mb-8">
            Let's discuss how I can help improve your security posture.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-galaxy-red text-galaxy-bg font-semibold rounded-lg hover:bg-galaxy-red-secondary transition-colors duration-200"
          >
            Get In Touch
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

