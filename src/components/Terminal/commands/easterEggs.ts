import { CommandResult } from '../CommandParser';
import { ls } from './index';

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

export function sudo(args: string[]): CommandResult {
  const fullCommand = args.join(' ');
  
  // Check for "make me a sandwich"
  if (fullCommand.includes('make me a sandwich')) {
    const output = `
${colors.green}[sudo] password for visitor: ${colors.reset}***********

${colors.yellow}      _______________
     /               \\
    /  ${colors.bold}JOB OFFER${colors.reset}${colors.yellow}      \\
   /___________________\\
   |  ~~~~~~~~~~~~~~~~  |
   |  ${colors.cyan}Red Team Role${colors.reset}${colors.yellow}   |
   |  ~~~~~~~~~~~~~~~~  |
   |  ${colors.green}✓ Competitive Pay${colors.reset}${colors.yellow} |
   |  ${colors.green}✓ Great Benefits${colors.reset}${colors.yellow}  |
   |  ${colors.green}✓ Remote Options${colors.reset}${colors.yellow}  |
   |___________________|${colors.reset}

${colors.bold}${colors.green}✓ Sandwich delivered!${colors.reset}

${colors.cyan}But seriously...${colors.reset} I'm looking for opportunities in:
  • Red Team Operations
  • Penetration Testing
  • Security Research

Type ${colors.yellow}'contact'${colors.reset} to get in touch!
`;
    return { output };
  }
  
  // Check for "rm -rf /"
  if (fullCommand.includes('rm') && fullCommand.includes('-rf') && fullCommand.includes('/')) {
    const output = `
${colors.red}${colors.bold}[sudo] Permission denied!${colors.reset}

${colors.yellow}But I like your style!${colors.reset} 

Attempting to remove root? Bold move. That kind of confidence 
is exactly what I bring to offensive security roles.

Want to discuss how I can ${colors.cyan}ethically${colors.reset} break things for your 
organization instead?

Type ${colors.yellow}'contact'${colors.reset} or ${colors.yellow}'ssh opportunities@darriusgrate.com'${colors.reset}
`;
    return { output };
  }
  
  // Default sudo response
  const output = `
${colors.yellow}Nice try!${colors.reset} sudo isn't enabled here... 

But I ${colors.bold}like your confidence!${colors.reset} That's the kind of attitude 
that makes a great security professional.

Type ${colors.yellow}'contact'${colors.reset} for real opportunities or ${colors.yellow}'tour'${colors.reset} to explore!
`;
  return { output };
}

export function cowsay(args: string[]): CommandResult {
  const message = args.length > 0 ? args.join(' ') : 'Moo! Check out my projects!';
  
  // Create the speech bubble
  const messageLength = message.length;
  const topBorder = ' ' + '_'.repeat(messageLength + 2);
  const bottomBorder = ' ' + '-'.repeat(messageLength + 2);
  
  const output = `
${topBorder}
< ${message} >
${bottomBorder}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;
  return { output };
}

export function sl(args: string[]): CommandResult {
  const output = `
${colors.yellow}${colors.bold}Did you mean 'ls'?${colors.reset}

${colors.cyan}Here's a steam locomotive for your typo!${colors.reset}

      ${colors.white}====        ________                ___________ 
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  |  ______|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|__
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=O=====O=====O=====O   |_____/~\\___/      
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/${colors.reset}

${colors.green}Now here's what you probably wanted:${colors.reset}
`;

  // Get actual ls output
  const lsResult = ls([]);
  return { output: output + '\n' + (lsResult.output || '') };
}

export function wget(args: string[]): CommandResult {
  // Check if downloading resume
  if (args.some(arg => arg.includes('resume'))) {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    
    const output = `
--${timestamp}--  https://darriusgrate.com/resume.pdf
Resolving darriusgrate.com... 192.0.2.1
Connecting to darriusgrate.com|192.0.2.1|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 245760 (240K) [application/pdf]
Saving to: 'resume.pdf'

resume.pdf      100%[=============>]  240K  --.-KB/s    in 0.001s

${timestamp} (200 MB/s) - 'resume.pdf' saved [245760/245760]

${colors.green}${colors.bold}✓ Download complete!${colors.reset}

${colors.cyan}View my resume at:${colors.reset} https://darriusgrate.com/resume

${colors.yellow}Quick Summary:${colors.reset}
• ${colors.bold}5+ years${colors.reset} IT operations experience
• ${colors.bold}Transitioning to Red Team${colors.reset} operations (Day 47/90)
• Specializing in ${colors.cyan}Active Directory${colors.reset} security
• Proficient in ${colors.cyan}C/Python/Bash${colors.reset}
• Building offensive security toolkit (ACLGuard, labs, writeups)

Type ${colors.yellow}'about'${colors.reset} for more info or ${colors.yellow}'contact'${colors.reset} to connect!
`;
    return { output };
  }
  
  // Default wget error
  const output = `
${colors.red}wget: missing URL${colors.reset}
Usage: wget [URL]

${colors.yellow}Hint:${colors.reset} Try ${colors.cyan}'wget resume.pdf'${colors.reset} to download my resume!
`;
  return { output };
}

export function ssh(args: string[]): CommandResult {
  // Check for opportunities@darriusgrate.com
  if (args.some(arg => arg.includes('opportunities@darriusgrate.com'))) {
    const output = `
${colors.cyan}Connecting to opportunities@darriusgrate.com...${colors.reset}
Host key fingerprint is SHA256:deadbeef1337c0ffee...
The authenticity of host can't be established.
Are you sure you want to continue connecting? ${colors.green}yes${colors.reset}

Warning: Permanently added 'opportunities@darriusgrate.com' (ED25519) to the list of known hosts.

${colors.bold}${colors.green}╔════════════════════════════════════════════════════════════╗
║  Welcome to Darrius Grate's Career Opportunities Portal!  ║
╚════════════════════════════════════════════════════════════╝${colors.reset}

${colors.yellow}${colors.bold}OPEN POSITIONS:${colors.reset}
  ${colors.cyan}•${colors.reset} Red Team Operator
  ${colors.cyan}•${colors.reset} Penetration Tester  
  ${colors.cyan}•${colors.reset} Security Researcher

${colors.yellow}${colors.bold}COLLABORATION OPPORTUNITIES:${colors.reset}
  ${colors.cyan}•${colors.reset} Open Source Security Tools
  ${colors.cyan}•${colors.reset} Research & Blog Posts
  ${colors.cyan}•${colors.reset} Conference Talks

${colors.yellow}${colors.bold}CURRENT STATUS:${colors.reset}
  ${colors.green}▸${colors.reset} Day 47/90 of intensive Red Team training
  ${colors.green}▸${colors.reset} Building production-ready offensive tools
  ${colors.green}▸${colors.reset} Active on GitHub: @ForeverLX

${colors.cyan}─────────────────────────────────────────────────────────────${colors.reset}

Type ${colors.yellow}'contact'${colors.reset} for more information or reach out via:

  ${colors.bold}Email:${colors.reset}    contact@darriusgrate.com
  ${colors.bold}LinkedIn:${colors.reset} linkedin.com/in/darrius-grate
  ${colors.bold}GitHub:${colors.reset}   github.com/ForeverLX
  ${colors.bold}Twitter:${colors.reset}  @DarriusGrate

${colors.green}Connection to opportunities@darriusgrate.com closed.${colors.reset}
`;
    return { output };
  }
  
  // Default ssh error
  const target = args[0] || 'unknown';
  const output = `
${colors.red}ssh: connect to host ${target} port 22: Connection refused${colors.reset}

${colors.yellow}Hint:${colors.reset} Try ${colors.cyan}'ssh opportunities@darriusgrate.com'${colors.reset} instead!
`;
  return { output };
}


