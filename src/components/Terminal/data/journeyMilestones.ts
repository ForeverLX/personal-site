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
    title: "Content Roadmap",
    dateRange: "Sep 29 - Oct 5",
    status: "completed",
    description: "Planned content series and documentation goals",
    details: [
      "Defined content themes and priorities",
      "Mapped writeup coverage gaps",
      "Outlined content scope and priorities",
      "Set documentation standards"
    ]
  },
  {
    week: 6,
    title: "Writeups Expansion",
    dateRange: "Oct 6-12",
    status: "completed",
    description: "Expanded writeups with clearer methodology",
    details: [
      "Structured writeup templates",
      "Verification-first documentation",
      "Mitigation summaries",
      "Evidence capture standards"
    ]
  },
  {
    week: 7,
    title: "Content Pre-Production",
    dateRange: "Oct 13-19",
    status: "current",
    description: "Preparing long-form walkthrough content",
    details: [
      "Script outlines and demo plans",
      "Recording workflow setup",
      "First episode scope",
      "Release cadence planning"
    ]
  },
  {
    week: 8,
    title: "Collaboration Outreach",
    dateRange: "Oct 20-26",
    status: "upcoming",
    description: "Connecting with bug bounty and research collaborators",
    details: [
      "Collaboration targets identified",
      "Project alignment discussions",
      "Lab scope and rules of engagement",
      "Shared writeup standards"
    ]
  },
  {
    week: 9,
    title: "Reverse Engineering Focus",
    dateRange: "Oct 27 - Nov 2",
    status: "upcoming",
    description: "Reverse engineering writeups and tooling",
    details: [
      "GDB workflow and analysis",
      "Reverse engineering patterns",
      "Shellcode exercises",
      "Verification-first writeups"
    ]
  },
  {
    week: 10,
    title: "Binary Exploitation Focus",
    dateRange: "Nov 3-9",
    status: "upcoming",
    description: "Binary exploitation walkthroughs",
    details: [
      "Tooling setup and repeatable notes",
      "Assembly fundamentals",
      "Exploit development practice",
      "Evidence capture standards"
    ]
  },
  {
    week: 11,
    title: "Integration & Testing",
    dateRange: "Nov 10-16",
    status: "upcoming",
    description: "Tool integration and comprehensive testing",
    details: [
      "ACLGuard + workstation + writeups integration",
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
