export interface PortfolioContent {
  file: string;
  line: number;
  content: string;
  category: 'projects' | 'research' | 'skills' | 'about';
}

export const portfolioContent: PortfolioContent[] = [
  // Projects content
  {
    file: "./projects/aclguard-v2/README.md",
    line: 47,
    content: "Automated Kerberoasting with AI-driven target selection",
    category: "projects"
  },
  {
    file: "./projects/aclguard-v2/README.md",
    line: 52,
    content: "AS-REP Roasting automation with intelligent user enumeration",
    category: "projects"
  },
  {
    file: "./projects/aclguard-v2/README.md",
    line: 58,
    content: "Golden Ticket attack simulation and detection testing",
    category: "projects"
  },
  {
    file: "./projects/aclguard-v2/README.md",
    line: 63,
    content: "DCSync attack automation with stealth techniques",
    category: "projects"
  },
  {
    file: "./projects/custom-c2/README.md",
    line: 23,
    content: "HTTP/S beaconing with advanced encryption and obfuscation",
    category: "projects"
  },
  {
    file: "./projects/custom-c2/README.md",
    line: 28,
    content: "Process injection techniques for lateral movement",
    category: "projects"
  },
  {
    file: "./projects/custom-c2/README.md",
    line: 33,
    content: "Memory evasion and anti-detection mechanisms",
    category: "projects"
  },
  {
    file: "./projects/linux-rootkit/README.md",
    line: 15,
    content: "Kernel module development for process and file hiding",
    category: "projects"
  },
  {
    file: "./projects/linux-rootkit/README.md",
    line: 20,
    content: "System call hooking for stealth operations",
    category: "projects"
  },

  // Research content
  {
    file: "./research/week-6-ad-attacks.md",
    line: 23,
    content: "Deep dive into Kerberoasting: Detection and Prevention",
    category: "research"
  },
  {
    file: "./research/week-6-ad-attacks.md",
    line: 45,
    content: "AS-REP Roasting attack vectors and mitigation strategies",
    category: "research"
  },
  {
    file: "./research/week-6-ad-attacks.md",
    line: 67,
    content: "Golden Ticket attacks: Understanding the attack chain",
    category: "research"
  },
  {
    file: "./research/week-6-ad-attacks.md",
    line: 89,
    content: "DCSync attacks and domain controller protection",
    category: "research"
  },
  {
    file: "./research/week-7-c2-development.md",
    line: 12,
    content: "Custom C2 framework architecture and design patterns",
    category: "research"
  },
  {
    file: "./research/week-7-c2-development.md",
    line: 34,
    content: "Process injection techniques: DLL injection, process hollowing",
    category: "research"
  },
  {
    file: "./research/week-7-c2-development.md",
    line: 56,
    content: "Memory evasion techniques and anti-forensics",
    category: "research"
  },
  {
    file: "./research/week-8-lateral-movement.md",
    line: 18,
    content: "Lateral movement strategies in Active Directory environments",
    category: "research"
  },
  {
    file: "./research/week-8-lateral-movement.md",
    line: 41,
    content: "Token manipulation and impersonation techniques",
    category: "research"
  },
  {
    file: "./research/week-9-linux-rootkit.md",
    line: 25,
    content: "Linux kernel module development for security research",
    category: "research"
  },
  {
    file: "./research/week-9-linux-rootkit.md",
    line: 48,
    content: "System call hooking and kernel-level stealth",
    category: "research"
  },

  // Skills content
  {
    file: "./skills/offensive-security.txt",
    line: 12,
    content: "Kerberoasting, AS-REP Roasting, Golden Ticket attacks",
    category: "skills"
  },
  {
    file: "./skills/offensive-security.txt",
    line: 15,
    content: "DCSync attacks and domain controller exploitation",
    category: "skills"
  },
  {
    file: "./skills/offensive-security.txt",
    line: 18,
    content: "Lateral movement and privilege escalation techniques",
    category: "skills"
  },
  {
    file: "./skills/offensive-security.txt",
    line: 21,
    content: "Process injection and memory manipulation",
    category: "skills"
  },
  {
    file: "./skills/programming.txt",
    line: 8,
    content: "C programming for systems and kernel development",
    category: "skills"
  },
  {
    file: "./skills/programming.txt",
    line: 12,
    content: "Python automation and security tool development",
    category: "skills"
  },
  {
    file: "./skills/programming.txt",
    line: 16,
    content: "PowerShell for Active Directory automation",
    category: "skills"
  },
  {
    file: "./skills/programming.txt",
    line: 20,
    content: "Bash scripting for Linux administration",
    category: "skills"
  },
  {
    file: "./skills/infrastructure.txt",
    line: 10,
    content: "Proxmox virtualization for security testing environments",
    category: "skills"
  },
  {
    file: "./skills/infrastructure.txt",
    line: 14,
    content: "Active Directory lab environments and testing",
    category: "skills"
  },
  {
    file: "./skills/infrastructure.txt",
    line: 18,
    content: "Linux system administration and hardening",
    category: "skills"
  },
  {
    file: "./skills/infrastructure.txt",
    line: 22,
    content: "Network security and segmentation design",
    category: "skills"
  },

  // About content
  {
    file: "./about.txt",
    line: 5,
    content: "90-day intensive journey to transition into red team operations",
    category: "about"
  },
  {
    file: "./about.txt",
    line: 12,
    content: "Build > Study philosophy - expertise through production code",
    category: "about"
  },
  {
    file: "./about.txt",
    line: 18,
    content: "Mission: Land $50-70k Red Team or Security Engineer role",
    category: "about"
  },
  {
    file: "./about.txt",
    line: 25,
    content: "Current focus: Building custom C2 framework in C",
    category: "about"
  },
  {
    file: "./about.txt",
    line: 32,
    content: "Arch Linux daily driver with 10 months experience",
    category: "about"
  },
  {
    file: "./about.txt",
    line: 38,
    content: "Strong foundation in systems programming and AD security",
    category: "about"
  }
];
