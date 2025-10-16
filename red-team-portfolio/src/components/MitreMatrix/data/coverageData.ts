export interface MitreTechnique {
  id: string
  name: string
  tactic: string
  description: string
  coverage: 'full' | 'partial' | 'none'
  tools: ToolCoverage[]
  detectionOpportunities?: string[]
  mitrLink: string
}

export interface ToolCoverage {
  name: 'ACLGuard' | 'Custom C2' | 'Linux Rootkit'
  capability: string
  implementation: 'automated' | 'manual' | 'planned'
  githubLink?: string
  blogLink?: string
}

// Red Team Operations Toolkit Coverage
export const mitreCoverage: MitreTechnique[] = [
  // DISCOVERY
  {
    id: 'T1087.002',
    name: 'Account Discovery: Domain Account',
    tactic: 'Discovery',
    description: 'Adversaries may attempt to get a listing of domain accounts.',
    coverage: 'full',
    tools: [
      {
        name: 'ACLGuard',
        capability: 'Automated LDAP enumeration of all domain accounts',
        implementation: 'automated',
        githubLink: 'https://github.com/ForeverLX/aclguard-v2',
        blogLink: '/research/ad-enumeration'
      }
    ],
    detectionOpportunities: [
      'Event ID 4662 - LDAP queries from non-DC',
      'High volume of LDAP searches',
      'Unusual user enumeration patterns'
    ],
    mitrLink: 'https://attack.mitre.org/techniques/T1087/002/'
  },

  // CREDENTIAL ACCESS
  {
    id: 'T1558.003',
    name: 'Steal or Forge Kerberos Tickets: Kerberoasting',
    tactic: 'Credential Access',
    description: 'Adversaries may abuse a valid Kerberos ticket-granting ticket (TGT) or sniff network traffic to obtain a ticket-granting service (TGS) ticket.',
    coverage: 'full',
    tools: [
      {
        name: 'ACLGuard',
        capability: 'Automated Kerberoasting: SPN enumeration, TGS request, hash extraction',
        implementation: 'automated',
        githubLink: 'https://github.com/ForeverLX/aclguard-v2',
        blogLink: '/research/kerberoasting-automation'
      }
    ],
    detectionOpportunities: [
      'Event ID 4769 - High volume TGS requests from single account',
      'RC4 encryption in Kerberos tickets',
      'Service ticket requests for sensitive SPNs'
    ],
    mitrLink: 'https://attack.mitre.org/techniques/T1558/003/'
  },

  {
    id: 'T1558.004',
    name: 'Steal or Forge Kerberos Tickets: AS-REP Roasting',
    tactic: 'Credential Access',
    description: 'Adversaries may reveal credentials of accounts with Kerberos preauthentication disabled.',
    coverage: 'full',
    tools: [
      {
        name: 'ACLGuard',
        capability: 'Automated AS-REP Roasting: Identify accounts with preauth disabled, request AS-REP, crack offline',
        implementation: 'automated',
        githubLink: 'https://github.com/ForeverLX/aclguard-v2'
      }
    ],
    detectionOpportunities: [
      'Event ID 4768 - AS-REP requests for multiple accounts',
      'Accounts with "Do not require Kerberos preauthentication" flag',
      'Unusual AS-REQ patterns'
    ],
    mitrLink: 'https://attack.mitre.org/techniques/T1558/004/'
  },

  {
    id: 'T1003.006',
    name: 'OS Credential Dumping: DCSync',
    tactic: 'Credential Access',
    description: 'Adversaries may attempt to access credentials by abusing DCSync to retrieve password data from Active Directory.',
    coverage: 'full',
    tools: [
      {
        name: 'ACLGuard',
        capability: 'Automated DCSync: Exploit replication rights to dump NTLM hashes including KRBTGT',
        implementation: 'automated',
        githubLink: 'https://github.com/ForeverLX/aclguard-v2'
      }
    ],
    detectionOpportunities: [
      'Event ID 4662 - Replication from non-DC',
      'Directory Service Access with specific GUID',
      'Replication requests from workstations'
    ],
    mitrLink: 'https://attack.mitre.org/techniques/T1003/006/'
  },

  {
    id: 'T1558.001',
    name: 'Steal or Forge Kerberos Tickets: Golden Ticket',
    tactic: 'Credential Access',
    description: 'Adversaries may forge Kerberos tickets using compromised KRBTGT account credentials.',
    coverage: 'full',
    tools: [
      {
        name: 'ACLGuard',
        capability: 'Golden Ticket generation after DCSync obtains KRBTGT hash',
        implementation: 'automated',
        githubLink: 'https://github.com/ForeverLX/aclguard-v2'
      }
    ],
    detectionOpportunities: [
      'Event ID 4624 - Logons with impossible timestamps',
      'Kerberos tickets with unusual lifetimes',
      'Authentication from unusual sources'
    ],
    mitrLink: 'https://attack.mitre.org/techniques/T1558/001/'
  },

  // COMMAND AND CONTROL
  {
    id: 'T1071.001',
    name: 'Application Layer Protocol: Web Protocols',
    tactic: 'Command and Control',
    description: 'Adversaries may communicate using application layer protocols associated with web traffic.',
    coverage: 'full',
    tools: [
      {
        name: 'Custom C2',
        capability: 'HTTP/HTTPS beaconing with customizable intervals and jitter',
        implementation: 'automated',
        githubLink: 'https://github.com/ForeverLX/custom-c2'
      }
    ],
    detectionOpportunities: [
      'Unusual outbound HTTP/HTTPS patterns',
      'Beaconing behavior (regular intervals)',
      'User-Agent anomalies'
    ],
    mitrLink: 'https://attack.mitre.org/techniques/T1071/001/'
  },

  // DEFENSE EVASION
  {
    id: 'T1055',
    name: 'Process Injection',
    tactic: 'Defense Evasion',
    description: 'Adversaries may inject code into processes to evade process-based defenses.',
    coverage: 'full',
    tools: [
      {
        name: 'Custom C2',
        capability: 'Process injection for beacon deployment and execution',
        implementation: 'automated',
        githubLink: 'https://github.com/ForeverLX/custom-c2'
      }
    ],
    detectionOpportunities: [
      'Suspicious process memory writes',
      'CreateRemoteThread API calls',
      'Unsigned code in process memory'
    ],
    mitrLink: 'https://attack.mitre.org/techniques/T1055/'
  },

  // LATERAL MOVEMENT
  {
    id: 'T1570',
    name: 'Lateral Tool Transfer',
    tactic: 'Lateral Movement',
    description: 'Adversaries may transfer tools or files between systems in a compromised environment.',
    coverage: 'partial',
    tools: [
      {
        name: 'Custom C2',
        capability: 'File upload/download capabilities between C2 server and implants',
        implementation: 'automated',
        githubLink: 'https://github.com/ForeverLX/custom-c2'
      }
    ],
    detectionOpportunities: [
      'Unusual file transfers',
      'SMB/RDP traffic between workstations',
      'New executables on systems'
    ],
    mitrLink: 'https://attack.mitre.org/techniques/T1570/'
  },

  // PERSISTENCE
  {
    id: 'T1014',
    name: 'Rootkit',
    tactic: 'Defense Evasion',
    description: 'Adversaries may use rootkits to hide the presence of programs, files, or processes.',
    coverage: 'partial',
    tools: [
      {
        name: 'Linux Rootkit',
        capability: 'Kernel-level hiding of processes, files, and network connections',
        implementation: 'planned',
        githubLink: 'https://github.com/ForeverLX/linux-rootkit'
      }
    ],
    detectionOpportunities: [
      'Discrepancies between user-space and kernel-space process listings',
      'Memory integrity checks',
      'Kernel module loading events'
    ],
    mitrLink: 'https://attack.mitre.org/techniques/T1014/'
  },

  {
    id: 'T1564.001',
    name: 'Hide Artifacts: Hidden Files and Directories',
    tactic: 'Defense Evasion',
    description: 'Adversaries may hide files and directories to evade detection.',
    coverage: 'partial',
    tools: [
      {
        name: 'Linux Rootkit',
        capability: 'File and directory hiding at kernel level',
        implementation: 'planned'
      }
    ],
    detectionOpportunities: [
      'File system integrity monitoring',
      'Hidden file detection tools',
      'Disk usage discrepancies'
    ],
    mitrLink: 'https://attack.mitre.org/techniques/T1564/001/'
  }
]

// Summary statistics
export function getCoverageStats() {
  const total = mitreCoverage.length
  const full = mitreCoverage.filter(t => t.coverage === 'full').length
  const partial = mitreCoverage.filter(t => t.coverage === 'partial').length
  const none = mitreCoverage.filter(t => t.coverage === 'none').length

  return {
    total,
    full,
    partial,
    none,
    coveragePercentage: Math.round((full / total) * 100)
  }
}

// Group by tactic
export function getTacticGroups() {
  const groups = new Map<string, MitreTechnique[]>()
  
  mitreCoverage.forEach(technique => {
    if (!groups.has(technique.tactic)) {
      groups.set(technique.tactic, [])
    }
    groups.get(technique.tactic)!.push(technique)
  })

  return groups
}
