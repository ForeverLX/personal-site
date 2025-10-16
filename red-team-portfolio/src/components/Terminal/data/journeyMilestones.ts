export interface JourneyMilestone {
  week: number;
  title: string;
  dateRange: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  details: string[];
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    week: 1,
    title: "Foundation Setup",
    dateRange: "Sep 1-7",
    status: "completed",
    description: "Proxmox lab environment, Initial AD setup",
    details: [
      "Proxmox virtualization platform setup",
      "Windows Server 2022 domain controller",
      "Initial Active Directory forest configuration",
      "Basic network segmentation"
    ]
  },
  {
    week: 2,
    title: "ACLGuard v1",
    dateRange: "Sep 8-14",
    status: "completed",
    description: "Python automation framework basics",
    details: [
      "Python-based AD enumeration tools",
      "Basic Kerberoasting automation",
      "Initial BloodHound integration",
      "Command-line interface development"
    ]
  },
  {
    week: 3,
    title: "AD Attack Research",
    dateRange: "Sep 15-21",
    status: "completed",
    description: "Deep dive into Active Directory attacks",
    details: [
      "Kerberoasting technique analysis",
      "AS-REP Roasting implementation",
      "Golden Ticket attack research",
      "DCSync attack methodology"
    ]
  },
  {
    week: 4,
    title: "ACLGuard Enhancement",
    dateRange: "Sep 22-28",
    status: "completed",
    description: "Advanced automation features",
    details: [
      "AI-driven target selection",
      "Automated attack chain execution",
      "Enhanced reporting capabilities",
      "Integration with MITRE ATT&CK"
    ]
  },
  {
    week: 5,
    title: "C2 Framework Planning",
    dateRange: "Sep 29 - Oct 5",
    status: "completed",
    description: "Command & Control architecture design",
    details: [
      "HTTP/S beaconing protocol design",
      "Process injection research",
      "Anti-detection mechanisms",
      "Modular architecture planning"
    ]
  },
  {
    week: 6,
    title: "C2 Core Development",
    dateRange: "Oct 6-12",
    status: "completed",
    description: "Basic C2 framework implementation",
    details: [
      "HTTP beacon implementation",
      "Basic command execution",
      "File transfer capabilities",
      "Process enumeration features"
    ]
  },
  {
    week: 7,
    title: "Custom C2 Development",
    dateRange: "Oct 13-19",
    status: "current",
    description: "HTTP/S beaconing, Process injection research",
    details: [
      "Advanced process injection techniques",
      "Memory evasion methods",
      "HTTPS beaconing with encryption",
      "Lateral movement capabilities"
    ]
  },
  {
    week: 8,
    title: "C2 Advanced Features",
    dateRange: "Oct 20-26",
    status: "upcoming",
    description: "Lateral movement, Token manipulation",
    details: [
      "Token impersonation techniques",
      "Lateral movement automation",
      "Persistence mechanisms",
      "Anti-forensics features"
    ]
  },
  {
    week: 9,
    title: "Linux Rootkit Planning",
    dateRange: "Oct 27 - Nov 2",
    status: "upcoming",
    description: "Kernel module development planning",
    details: [
      "Linux kernel module research",
      "System call hooking techniques",
      "File and process hiding",
      "Network traffic obfuscation"
    ]
  },
  {
    week: 10,
    title: "Linux Rootkit Development",
    dateRange: "Nov 3-9",
    status: "upcoming",
    description: "Kernel module implementation",
    details: [
      "Basic kernel module structure",
      "System call interception",
      "Process and file hiding",
      "Network communication hiding"
    ]
  },
  {
    week: 11,
    title: "Integration & Testing",
    dateRange: "Nov 10-16",
    status: "upcoming",
    description: "Tool integration and comprehensive testing",
    details: [
      "ACLGuard + C2 + Rootkit integration",
      "End-to-end attack simulation",
      "Detection evasion testing",
      "Performance optimization"
    ]
  },
  {
    week: 12,
    title: "Documentation & Portfolio",
    dateRange: "Nov 17-23",
    status: "upcoming",
    description: "Final documentation and portfolio completion",
    details: [
      "Comprehensive documentation",
      "Video demonstrations",
      "Portfolio website completion",
      "Job application preparation"
    ]
  }
];
