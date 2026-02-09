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
    file: "./writeups/reverse-engineering/stacksmash/re-1/README.md",
    line: 1,
    content: "Reverse engineering writeups with GDB and strings-first triage",
    category: "projects"
  },
  {
    file: "./writeups/binary-exploitation/stacksmash/shellcode-1/README.md",
    line: 1,
    content: "Shellcode walkthroughs and ABI-aware payload notes",
    category: "projects"
  },
  {
    file: "./writeups/README.md",
    line: 23,
    content: "Writeup hub overview and navigation",
    category: "projects"
  },
  {
    file: "./writeups/README.md",
    line: 28,
    content: "Reverse engineering and binary exploitation writeups",
    category: "projects"
  },
  {
    file: "./writeups/README.md",
    line: 33,
    content: "Writeup methodology and evidence capture",
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
    file: "./writeups/reverse-engineering/README.md",
    line: 12,
    content: "Reverse engineering focus areas and study notes",
    category: "research"
  },
  {
    file: "./writeups/reverse-engineering/README.md",
    line: 34,
    content: "Methodology notes: reasoning, verification, mitigations",
    category: "research"
  },
  {
    file: "./writeups/reverse-engineering/README.md",
    line: 56,
    content: "Writeup-first workflow and repeatability",
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
    content: "Current focus: writeups and reverse engineering practice",
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
