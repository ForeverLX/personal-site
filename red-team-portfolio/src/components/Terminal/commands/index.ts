import { CommandResult } from '../CommandParser';
import { journeyMilestones } from '../data/journeyMilestones';
import { searchPortfolioContent, formatSearchResults } from './searchContent';
import { getAttackSimulation, getAllAttackTechniques } from './attackSim';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[1;31m',
  green: '\x1b[1;32m',
  yellow: '\x1b[1;33m',
  blue: '\x1b[1;34m',
  magenta: '\x1b[1;35m',
  cyan: '\x1b[1;36m',
  white: '\x1b[1;37m',
};

export function help(args: string[]): CommandResult {
  const output = `
${colors.bold}Available Commands:${colors.reset}

${colors.cyan}Navigation:${colors.reset}
  help        - Show this help message
  about       - Learn about Darrius Grate
  projects    - View security projects and Red Team toolkit
  skills      - Display technical skills and expertise
  contact     - Get in touch for opportunities or services
  
${colors.cyan}Information:${colors.reset}
  whoami      - Show current journey status (Day X/90)
  fastfetch   - Display system information with ASCII logo
  neofetch    - Alias for fastfetch
  history     - Show 90-day journey milestones
  ls          - List available content
  pwd         - Show current location
  
${colors.cyan}Interactive:${colors.reset}
  tour        - Take a guided tour of the portfolio
  attack-sim  - Run attack simulations (kerberoast, golden-ticket, etc.)
  ps          - Show running projects as processes
  grep        - Search portfolio content
  
${colors.cyan}Utilities:${colors.reset}
  clear       - Clear terminal screen
  
${colors.cyan}Easter Eggs:${colors.reset}
  sudo        - Try it and see what happens!
  cowsay      - ASCII art cow says your message
  sl          - For when you typo 'ls'
  wget        - Download my resume
  ssh         - Connect to opportunities
  
${colors.yellow}Tip: Try 'attack-sim' to see available attack simulations!${colors.reset}
${colors.yellow}Tip: Try 'fastfetch' to see system information!${colors.reset}
${colors.yellow}Tip: Try 'sudo make me a sandwich' for a surprise!${colors.reset}
`;

  return { output };
}

export function whoami(args: string[]): CommandResult {
  const dayNumber = 47; // Hardcoded for now, will be dynamic later
  
  const output = `
${colors.bold}${colors.blue}Darrius Grate${colors.reset} ${colors.magenta}(ForeverLX)${colors.reset}
${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

${colors.red}▸${colors.reset} Red Team Operator in Training
${colors.red}▸${colors.reset} Day ${dayNumber}/90 of intensive journey
${colors.red}▸${colors.reset} Current focus: Custom C2 Framework development
${colors.red}▸${colors.reset} Commit streak: ${dayNumber} days consecutive
${colors.red}▸${colors.reset} Status: Building in public, learning in public

${colors.bold}"I'm transitioning from <$30k/year to red team operations
through production-quality code, not just certifications."${colors.reset}

${colors.cyan}Type 'about' to learn more about my journey${colors.reset}
`;

  return { output };
}

export function about(args: string[]): CommandResult {
  const output = `
${colors.bold}${colors.red}About Darrius Grate (ForeverLX)${colors.reset}
${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

${colors.red}The Journey:${colors.reset}
I'm on a 90-day intensive journey to transition from making <$30k/year
into red team operations. Instead of collecting certifications, I'm
building production-quality security tools and documenting everything
publicly.

${colors.red}The Philosophy:${colors.reset}
${colors.bold}Build > Study${colors.reset}

Expertise is proven through what you build and share with the
community, not just credentials. Every day for 90 days, I'm:
  ${colors.red}•${colors.reset} Writing production C code for security tools
  ${colors.red}•${colors.reset} Documenting my learning journey publicly
  ${colors.red}•${colors.reset} Contributing to open-source security
  ${colors.red}•${colors.reset} Practicing real-world attack techniques

${colors.red}The Mission:${colors.reset}
Land a $50-70k Red Team or Security Engineer role by demonstrating
undeniable technical competence through:
  ${colors.red}•${colors.reset} The Red Team Operations Toolkit (3 interconnected projects)
  ${colors.red}•${colors.reset} Daily GitHub commits (currently Day 47/90)
  ${colors.red}•${colors.reset} Technical writeups and research
  ${colors.red}•${colors.reset} Real bug bounty findings

${colors.red}Current Focus:${colors.reset}
Week 7 - Building a custom C2 framework in C that integrates with
ACLGuard for full red team operation simulation.

${colors.red}Background:${colors.reset}
Using Arch Linux as daily driver for 10 months. Strong foundation in
systems programming, Active Directory security, and low-level C
development. Currently strengthening reverse engineering and malware
analysis skills.

${colors.cyan}Want to follow along?${colors.reset}
  ${colors.blue}Twitter${colors.reset}: @ForeverLX (daily updates)
  ${colors.blue}GitHub${colors.reset}: github.com/ForeverLX (daily commits)
  ${colors.blue}LinkedIn${colors.reset}: linkedin.com/in/darrius-grate

${colors.cyan}Type 'whoami' to see current journey status${colors.reset}
${colors.cyan}Type 'projects' to see what I'm building${colors.reset}
${colors.cyan}Type 'contact' if you're hiring or need pentesting${colors.reset}
`;

  return { output };
}

export function projects(args: string[]): CommandResult {
  const output = `
${colors.bold}${colors.red}Red Team Operations Toolkit${colors.reset}
${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

Three interconnected tools demonstrating full attack lifecycle:

${colors.blue}1. ACLGuard v2.0${colors.reset} - AD Attack Automation
   ${colors.red}▸${colors.reset} Status: Active Development (Week 7/12)
   ${colors.red}▸${colors.reset} Tech: Python, Mistral 7B, Active Directory
   ${colors.red}▸${colors.reset} Purpose: Initial Access & Reconnaissance
   ${colors.red}▸${colors.reset} Features: Kerberoasting, AS-REP, BloodHound integration
   ${colors.red}▸${colors.reset} GitHub: github.com/ForeverLX/aclguard-v2
   
${colors.blue}2. Custom C2 Framework${colors.reset} - Lightweight Command & Control
   ${colors.red}▸${colors.reset} Status: In Progress (Week 7/12)
   ${colors.red}▸${colors.reset} Tech: C, HTTP/S beaconing
   ${colors.red}▸${colors.reset} Purpose: Command & Control
   ${colors.red}▸${colors.reset} Features: Process injection, lateral movement
   ${colors.red}▸${colors.reset} GitHub: github.com/ForeverLX/custom-c2
   
${colors.blue}3. Linux Rootkit${colors.reset} - Kernel-Level Persistence
   ${colors.red}▸${colors.reset} Status: Planned (Weeks 9-10)
   ${colors.red}▸${colors.reset} Tech: C, Linux Kernel Module
   ${colors.red}▸${colors.reset} Purpose: Persistence & Stealth
   ${colors.red}▸${colors.reset} Features: File/process/network hiding
   ${colors.red}▸${colors.reset} GitHub: Coming soon

${colors.cyan}Type 'skills' to see my technical expertise${colors.reset}
${colors.cyan}Type 'contact' to discuss opportunities${colors.reset}
`;

  return { output };
}

export function skills(args: string[]): CommandResult {
  const output = `
${colors.bold}${colors.red}Technical Skills & Expertise${colors.reset}
${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

${colors.red}▸ Offensive Security${colors.reset}
  ${colors.red}├─${colors.reset} Active Directory attacks (Kerberoasting, Golden Ticket, DCSync)
  ${colors.red}├─${colors.reset} Custom tool development for red team operations
  ${colors.red}├─${colors.reset} Attack chain automation and orchestration
  ${colors.red}└─${colors.reset} MITRE ATT&CK framework mapping

${colors.red}▸ Programming & Development${colors.reset}
  ${colors.red}├─${colors.reset} C (systems programming, rootkits, memory manipulation)
  ${colors.red}├─${colors.reset} Python (automation, security tools, AI integration)
  ${colors.red}├─${colors.reset} PowerShell (AD enumeration, Windows internals)
  ${colors.red}└─${colors.reset} Bash (Linux administration, scripting)

${colors.red}▸ Infrastructure & Labs${colors.reset}
  ${colors.red}├─${colors.reset} Proxmox virtualization for security testing
  ${colors.red}├─${colors.reset} Active Directory lab environments
  ${colors.red}├─${colors.reset} Linux system administration (Arch daily driver)
  ${colors.red}└─${colors.reset} Network security and segmentation

${colors.red}▸ Learning & Certifications${colors.reset}
  ${colors.red}├─${colors.reset} Certified Offensive Security Junior (CSOJ) - In Progress
  ${colors.red}├─${colors.reset} Active Directory Red Team Specialist - In Progress
  ${colors.red}├─${colors.reset} Reverse Engineering Certification - In Progress
  ${colors.red}├─${colors.reset} Security+ (Planned 2025)
  ${colors.red}└─${colors.reset} OSEP (Planned 2026)

${colors.cyan}View my projects: type 'projects'${colors.reset}
${colors.cyan}See my journey: type 'whoami'${colors.reset}
`;

  return { output };
}

export function contact(args: string[]): CommandResult {
  const output = `
${colors.bold}${colors.red}Get In Touch${colors.reset}
${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

${colors.red}Hiring for Red Team Operations?${colors.reset}
I'm actively seeking full-time opportunities ($50-70k range) in:
  ${colors.red}•${colors.reset} Red Team Operator roles
  ${colors.red}•${colors.reset} Security Engineer (AD focus)
  ${colors.red}•${colors.reset} Penetration Testing

${colors.red}Need Penetration Testing Services?${colors.reset}
I offer professional security assessments for small-to-medium
businesses:
  ${colors.red}•${colors.reset} Active Directory Security Assessment ($2,500-$5,000)
  ${colors.red}•${colors.reset} External Network Penetration Testing ($3,000-$6,000)
  ${colors.red}•${colors.reset} Web Application Security Assessment ($2,000-$4,000)
  ${colors.red}•${colors.reset} Custom Security Tooling Development (Quote-based)

${colors.red}Want to Collaborate?${colors.reset}
Open to:
  ${colors.red}•${colors.reset} Open-source security projects
  ${colors.red}•${colors.reset} Bug bounty collaboration
  ${colors.red}•${colors.reset} Security research partnerships
  ${colors.red}•${colors.reset} Speaking opportunities

${colors.red}Contact Methods:${colors.reset}
  ${colors.blue}Email${colors.reset}:    contact@darriusgrate.com
  ${colors.blue}Twitter${colors.reset}:  @DarriusGrate
  ${colors.blue}LinkedIn${colors.reset}: linkedin.com/in/darrius-grate
  ${colors.blue}GitHub${colors.reset}:   github.com/ForeverLX

${colors.cyan}Type 'projects' to see my work${colors.reset}
${colors.cyan}Or visit /contact on the site to send a message${colors.reset}
`;

  return { output };
}

export function ls(args: string[]): CommandResult {
  const output = `
${colors.cyan}projects/${colors.reset}
${colors.cyan}research/${colors.reset}
${colors.cyan}services/${colors.reset}
about.txt
resume.pdf
skills.txt
`;

  return { output };
}

export function pwd(args: string[]): CommandResult {
  return {
    output: '/home/darriusgrate/portfolio',
  };
}

export function clear(args: string[]): CommandResult {
  // This will be handled specially in Terminal component
  return {
    output: '\x1bc', // ANSI escape code to clear terminal
  };
}

// Advanced Commands

export function fastfetch(args: string[]): CommandResult {
  const output = `
${colors.red} ██████╗  ██████╗ ${colors.reset}
${colors.red} ██╔══██╗██╔════╝${colors.reset}     ${colors.bold}Darrius Grate (ForeverLX)${colors.reset}
${colors.red} ██║  ██║██║  ███╗${colors.reset}    ${colors.yellow}─────────────────────────${colors.reset}
${colors.red} ██║  ██║██║   ██║${colors.reset}    ${colors.magenta}OS:${colors.reset} Red Team Linux
${colors.red} ██████╔╝╚██████╔╝${colors.reset}    ${colors.magenta}Kernel:${colors.reset} Offensive-6.1
${colors.red} ╚═════╝  ╚═════╝${colors.reset}     ${colors.magenta}Uptime:${colors.reset} Day 47/90
${colors.magenta}Shell:${colors.reset} Portfolio Terminal v1.0
${colors.magenta}Specialization:${colors.reset} AD Security & Red Team Ops
${colors.magenta}Languages:${colors.reset} C, Python, PowerShell, Bash
${colors.magenta}Current Build:${colors.reset} Custom C2 Framework
${colors.magenta}Status:${colors.reset} Building in Public
${colors.magenta}GitHub:${colors.reset} github.com/ForeverLX
${colors.magenta}Twitter:${colors.reset} @ForeverLX
`;

  return { output };
}

export function neofetch(args: string[]): CommandResult {
  return fastfetch(args); // Alias for fastfetch
}

export function history(args: string[]): CommandResult {
  let output = `${colors.bold}${colors.red}90-Day Red Team Journey - Milestone Tracker${colors.reset}\n${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n\n`;

  journeyMilestones.forEach(milestone => {
    let statusIcon = '';
    let statusColor = '';
    
    switch (milestone.status) {
      case 'completed':
        statusIcon = '✓';
        statusColor = colors.red;
        break;
      case 'current':
        statusIcon = '➜';
        statusColor = colors.magenta;
        break;
      case 'upcoming':
        statusIcon = '○';
        statusColor = colors.white;
        break;
    }

    output += `${statusColor}${statusIcon} Week ${milestone.week}: ${milestone.title} (${milestone.dateRange})${colors.reset}\n`;
    output += `  └─ ${milestone.description}\n`;
    
    if (milestone.status === 'current') {
      output += `\n${colors.cyan}Current Focus:${colors.reset}\n`;
      milestone.details.forEach(detail => {
        output += `  ${colors.red}•${colors.reset} ${detail}\n`;
      });
    }
    
    output += '\n';
  });

  return { output };
}

export function ps(args: string[]): CommandResult {
  const output = `
${colors.magenta}USER       PID  %CPU  %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND${colors.reset}
${colors.red}darrius   1337  47.0  23.0  2048M  512M pts/0    R+   Oct01  147:23 aclguard-v2 --attack-automation --ad-focus${colors.reset}
${colors.red}darrius   2048  32.0  18.0  1536M  384M pts/1    S+   Oct15   89:47 custom-c2 --beacon-dev --process-injection${colors.reset}
${colors.white}darrius   3141  15.0   8.0   768M  128M pts/2    S+   Oct10   42:15 portfolio-site --nextjs --react${colors.reset}
${colors.white}darrius   4096   8.0   4.0   512M   64M pts/3    I    Oct05   18:30 proxmox-lab --ad-env --vuln-testing${colors.reset}
${colors.white}darrius   5926   3.0   2.0   256M   32M pts/4    S    Oct01    9:12 blog-engine --markdown --research${colors.reset}
`;

  return { output };
}

export function attackSim(args: string[]): CommandResult {
  if (args.length === 0) {
    const techniques = getAllAttackTechniques();
    const output = `
${colors.bold}${colors.red}Available Attack Simulations:${colors.reset}
${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

${techniques.map(tech => `  ${colors.magenta}•${colors.reset} ${tech}`).join('\n')}

${colors.cyan}Usage: attack-sim [technique]${colors.reset}
${colors.cyan}Example: attack-sim kerberoast${colors.reset}
`;
    return { output };
  }

  const technique = args[0].toLowerCase();
  const simulation = getAttackSimulation(technique);

  if (!simulation) {
    return {
      output: `${colors.red}Error: Unknown attack technique '${technique}'${colors.reset}\n${colors.cyan}Type 'attack-sim' to see available techniques${colors.reset}`
    };
  }

  let output = `
${colors.red}╔══════════════════════════════════════════════════════════════╗${colors.reset}
${colors.red}║  ATTACK SIMULATION: ${simulation.name.padEnd(42)} ║${colors.reset}
${colors.red}║  MITRE ATT&CK: ${simulation.mitreId.padEnd(47)} ║${colors.reset}
${colors.red}╚══════════════════════════════════════════════════════════════╝${colors.reset}

${colors.bold}${colors.red}Description:${colors.reset} ${simulation.description}

`;

  simulation.phases.forEach((phase, phaseIndex) => {
    output += `${colors.bold}${colors.red}Phase ${phaseIndex + 1}: ${phase.name}${colors.reset}\n`;
    
    phase.steps.forEach(step => {
      let icon = '';
      let color = '';
      
      switch (step.status) {
        case 'running':
          icon = '➜';
          color = colors.magenta;
          break;
        case 'completed':
          icon = '✓';
          color = colors.green;
          break;
        case 'warning':
          icon = '⚠️';
          color = colors.yellow;
          break;
        default:
          icon = '•';
          color = colors.white;
      }
      
      output += `  ${color}${icon} ${step.action}${colors.reset}`;
      
      if (step.result) {
        output += `\n    ${colors.white}${step.result}${colors.reset}`;
      }
      
      if (step.detection) {
        output += `\n    ${colors.yellow}Detection: ${step.detection}${colors.reset}`;
      }
      
      output += '\n';
    });
    
    output += '\n';
  });

  output += `${colors.cyan}┌─ ${simulation.automation.tool} ──────────────────────────────────────┐${colors.reset}\n`;
  output += `${colors.cyan}│ This attack is fully automated in ${simulation.automation.tool.padEnd(25)} │${colors.reset}\n`;
  output += `${colors.cyan}│ ▸ GitHub: ${simulation.automation.github.padEnd(48)} │${colors.reset}\n`;
  output += `${colors.cyan}│ ▸ Feature: ${simulation.automation.feature.padEnd(46)} │${colors.reset}\n`;
  output += `${colors.cyan}└────────────────────────────────────────────────────────────┘${colors.reset}\n\n`;

  output += `${colors.bold}${colors.red}Detection Opportunities:${colors.reset}\n`;
  simulation.detection.forEach((detection, index) => {
    output += `  ${index + 1}. ${detection}\n`;
  });

  output += `\n${colors.bold}${colors.red}Learn More:${colors.reset}\n`;
  output += `  ▸ Research: ${simulation.links.research}\n`;
  output += `  ▸ MITRE: ${simulation.links.mitre}\n`;

  return { output };
}

export function grep(args: string[]): CommandResult {
  if (args.length === 0) {
    return {
      output: `${colors.red}Usage: grep [search-term]${colors.reset}\n${colors.cyan}Example: grep kerberoast${colors.reset}`
    };
  }

  const searchTerm = args.join(' ');
  const results = searchPortfolioContent(searchTerm);
  const output = formatSearchResults(results, searchTerm);

  return { output };
}

export function tour(args: string[]): CommandResult {
  const output = `
╔════════════════════════════════════════════════════════════════════════╗
║                    🚀 PORTFOLIO GUIDED TOUR 🚀                         ║
╔════════════════════════════════════════════════════════════════════════╗

${colors.cyan}Starting interactive tour...${colors.reset}
`;

  return { 
    output,
    startTour: true // Special flag to indicate tour should start
  };
}

// Export Easter egg commands
export { sudo, cowsay, sl, wget, ssh } from './easterEggs';
