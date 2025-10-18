# Terminal Commands Reference

This document provides a comprehensive reference for all terminal commands available in the Darrius Grate Red Team Portfolio interactive terminal.

## Overview

The portfolio features a fully functional terminal emulator with 25+ commands, attack simulations, and interactive features. The terminal demonstrates both technical capabilities and red team methodology through hands-on examples.

## Core Commands

### Information Commands

#### `help`
**Description**: Display all available commands with descriptions  
**Usage**: `help`  
**Output**: Complete command list with categories

#### `whoami`
**Description**: Display developer information and current context  
**Usage**: `whoami`  
**Output**: 
```
User: ForeverLX
Role: Red Team Operator
Location: Building the future, one exploit at a time
Status: Currently transitioning from consulting to offensive security
```

#### `about`
**Description**: Show detailed about information  
**Usage**: `about`  
**Output**: Extended biography and journey narrative

#### `contact`
**Description**: Display contact information and methods  
**Usage**: `contact`  
**Output**: Email, social media, and professional contact details

### Navigation Commands

#### `projects`
**Description**: List all current projects  
**Usage**: `projects`  
**Output**: 
```
Current Projects:
1. ACLGuard v2.0 - Active Directory enumeration and attack path mapping
2. Custom C2 Framework - Command and control with stealth focus
3. Linux Rootkit - Kernel-level persistence and stealth
```

#### `skills`
**Description**: Display technical skills and proficiencies  
**Usage**: `skills`  
**Output**: Categorized skills with proficiency levels

#### `ls`
**Description**: List directory contents (simulated)  
**Usage**: `ls [options]`  
**Output**: Portfolio directory structure

#### `pwd`
**Description**: Print working directory  
**Usage**: `pwd`  
**Output**: Current directory path

### System Commands

#### `clear`
**Description**: Clear terminal screen  
**Usage**: `clear`  
**Output**: Clears all terminal content

#### `history`
**Description**: Show command history  
**Usage**: `history`  
**Output**: List of previously executed commands

#### `ps`
**Description**: Show running processes (simulated)  
**Usage**: `ps`  
**Output**: Simulated process list

### System Information Commands

#### `fastfetch`
**Description**: Fast system information display  
**Usage**: `fastfetch`  
**Output**: Quick system overview

#### `neofetch`
**Description**: Detailed system information with ASCII art  
**Usage**: `neofetch`  
**Output**: Comprehensive system information display

## Attack Simulation Commands

### `attack-sim`
**Description**: Run educational attack simulations  
**Usage**: `attack-sim [attack-type]`

#### Available Attack Types:

##### `attack-sim kerberoast`
**Description**: Kerberoasting attack simulation  
**Output**: 
```
[INFO] Starting Kerberoasting attack simulation...
[INFO] Enumerating service accounts with SPN...
[INFO] Requesting service tickets...
[INFO] Extracting TGS tickets for offline cracking...
[SUCCESS] Attack simulation completed
```

##### `attack-sim golden-ticket`
**Description**: Golden Ticket attack simulation  
**Output**: 
```
[INFO] Starting Golden Ticket attack simulation...
[INFO] Compromising KRBTGT account hash...
[INFO] Forging TGT with unlimited lifetime...
[INFO] Using forged ticket for domain persistence...
[SUCCESS] Attack simulation completed
```

##### `attack-sim asrep`
**Description**: AS-REP Roasting attack simulation  
**Output**: 
```
[INFO] Starting AS-REP Roasting attack simulation...
[INFO] Identifying accounts with pre-authentication disabled...
[INFO] Requesting AS-REP responses...
[INFO] Extracting encrypted data for offline cracking...
[SUCCESS] Attack simulation completed
```

##### `attack-sim dcsync`
**Description**: DCSync attack simulation  
**Output**: 
```
[INFO] Starting DCSync attack simulation...
[INFO] Using compromised account with replication rights...
[INFO] Requesting domain controller synchronization...
[INFO] Extracting password hashes from Active Directory...
[SUCCESS] Attack simulation completed
```

## Interactive Features

### `tour`
**Description**: Start guided tour of the portfolio  
**Usage**: `tour`  
**Features**: 
- 9-step interactive walkthrough
- Automatic progression with Enter key
- Educational content about red team journey
- Portfolio feature explanations

**Tour Steps**:
1. Welcome and introduction
2. Journey overview (90-day transition)
3. Current projects showcase
4. MITRE ATT&CK matrix explanation
5. Technical skills demonstration
6. Attack simulation examples
7. Contact and collaboration
8. Future roadmap
9. Thank you and next steps

### Command History Navigation
**Up Arrow**: Navigate to previous command  
**Down Arrow**: Navigate to next command  
**Tab**: Command completion and suggestions

### Tab Completion
**Available for**:
- All command names
- Attack simulation types
- File paths (simulated)

## Easter Egg Commands

### `sudo`
**Description**: Simulated privilege escalation  
**Usage**: `sudo [command]`  
**Output**: 
```
[sudo] password for ForeverLX: 
Sorry, try again.
[sudo] password for ForeverLX: 
Sorry, try again.
[sudo] password for ForeverLX: 
sudo: 3 incorrect password attempts
```

### `cowsay`
**Description**: ASCII art cow with message  
**Usage**: `cowsay [message]`  
**Output**: 
```
 _________________________________
< Red team operations require both >
 ---------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

### `sl`
**Description**: Steam locomotive animation  
**Usage**: `sl`  
**Output**: ASCII art train animation

### `wget`
**Description**: Simulated file download  
**Usage**: `wget [url]`  
**Output**: 
```
--2025-01-18 10:30:00--  https://example.com/file
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1024 (1.0K) [application/octet-stream]
Saving to: 'file'

100%[======================================>] 1,024       --.-K/s   in 0s

2025-01-18 10:30:01 (1.2 MB/s) - 'file' saved [1024/1024]
```

### `ssh`
**Description**: Simulated SSH connection  
**Usage**: `ssh [user@host]`  
**Output**: 
```
The authenticity of host 'example.com (93.184.216.34)' can't be established.
ECDSA key fingerprint is SHA256:abcd1234...
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'example.com' to the list of known hosts.
foreverlx@example.com's password: 
Permission denied, please try again.
```

### `telnet`
**Description**: Simulated telnet connection  
**Usage**: `telnet [host] [port]`  
**Output**: 
```
Trying 93.184.216.34...
Connected to example.com.
Escape character is '^]'.

Welcome to Example Server
login: foreverlx
Password: 
Login incorrect
```

### `man`
**Description**: Manual page viewer  
**Usage**: `man [command]`  
**Output**: Simulated manual page for the specified command

## Search Commands

### `grep`
**Description**: Search content within the portfolio  
**Usage**: `grep [pattern]`  
**Features**: 
- Tab completion for search terms
- Searches across project descriptions, skills, and content
- Case-insensitive matching

**Example**:
```bash
grep active-directory
# Returns: ACLGuard project, AD attack paths research, etc.
```

## Error Handling

### Invalid Commands
**Behavior**: Display helpful error message with suggestions  
**Example**:
```
Command not found: invalidcmd
Did you mean: help, whoami, about, projects, skills, contact, ls, pwd, clear, history, ps, fastfetch, neofetch, attack-sim, tour, sudo, cowsay, sl, wget, ssh, telnet, man, grep
```

### Command History
**Empty History**: Shows "No commands in history"  
**Navigation**: Up/down arrows work with command history  
**Persistence**: History maintained during session

## Technical Implementation

### Command Registry
- All commands registered in `CommandRegistry.ts`
- Extensible architecture for adding new commands
- Type-safe command definitions

### Input Processing
- Real-time command parsing
- Tab completion with fuzzy matching
- History navigation with arrow keys
- Special character handling

### Output Formatting
- ANSI color codes for terminal styling
- Consistent formatting across all commands
- Error messages with helpful suggestions

## Usage Tips

1. **Start with `help`** to see all available commands
2. **Use `tour`** for an interactive introduction
3. **Try `attack-sim`** to see red team techniques
4. **Use Tab completion** for faster command entry
5. **Navigate history** with Up/Down arrows
6. **Explore easter eggs** for fun interactions

## Security Considerations

- All commands are client-side simulations
- No actual system access or file operations
- Attack simulations are educational only
- No sensitive data processing or storage

---

**Document Version**: 1.0  
**Last Updated**: January 18, 2025  
**Total Commands**: 25+  
**Interactive Features**: Tour mode, history navigation, tab completion
