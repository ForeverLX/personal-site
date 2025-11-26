# Offensive Security Portfolio
**Darrius Grate** | Penetration Testing & Red Team Operations

---

## About Me

Offensive security professional specializing in Active Directory exploitation, 
Windows privilege escalation, and enterprise infrastructure assessment. I focus 
on realistic attack simulation with emphasis on business impact analysis and 
actionable remediation guidance.

**Technical Focus Areas:**
- Active Directory security (Kerberos attacks, ADCS exploitation, credential harvesting)
- Windows post-exploitation (token manipulation, LSASS dumping, lateral movement)
- Enterprise infrastructure (ESXi/vCenter, database security, virtualization)
- Living-off-the-land techniques on modern Windows environments

**Current Environment:** Arch Linux (custom pentest build) - demonstrates ability 
to adapt tooling beyond standard Kali distributions for real-world engagement constraints.

---

## Featured Assessment: TELECOM INC. Active Directory Compromise

<p align="center">
  <img width="994" height="703" alt="AD_RTS" src="https://github.com/user-attachments/assets/0dff9f0d-786d-4c02-873f-fe58ca6e1e13" />

</p>

**[📄 Download Full Report (PDF)](./assessments/TELECOM-INC-AD-Assessment.pdf)**  
**[🔧 Technical Challenges Document](./assessments/AD-RTS-Technical-Challenges.md)**

### Executive Summary

Complete domain compromise achieved through systematic exploitation of Active 
Directory misconfigurations, demonstrating attack progression from unauthenticated 
network access to complete infrastructure control within 3 hours of active exploitation 
(additional 4.5 hours of documented troubleshooting).

**Attack Chain:**  
Unauthenticated → AS-REP Roasting → MSSQL Exploitation → SYSTEM Escalation → 
LSASS Credential Harvesting → ADCS ESC1 Abuse → Domain Administrator → 
ESXi Hypervisor Lateral Movement → Complete Infrastructure Control

### Key Technical Capabilities Demonstrated

**Advanced Active Directory Exploitation:**
- Kerberos AS-REP Roasting (offline credential theft without authentication)
- ADCS ESC1 exploitation (certificate-based privilege escalation to Domain Admin)
- Pass-the-hash lateral movement (NTLM hash authentication)
- LSASS memory dumping (credential extraction from live systems)

**Windows Privilege Escalation:**
- SeImpersonate token manipulation via GodPotato
- Service account exploitation (MSSQL xp_cmdshell abuse)
- Living-off-the-land techniques (built-in Windows tools for stealth)

**Infrastructure Compromise:**
- VMware ESXi hypervisor exploitation via pyVmomi
- Guest VM command execution through VMware Tools API
- Multi-platform operations (Windows AD + Linux guest systems)

**Professional Documentation:**
- Executive summary for non-technical stakeholders
- Business impact analysis with regulatory compliance context (GDPR, PCI-DSS, FCC)
- Detailed remediation guidance for blue team implementation
- MITRE ATT&CK framework mapping

### Assessment Statistics

| Metric | Value |
|--------|-------|
| **Assessment Duration** | 25 hours (3 hours exploitation + 4.5 hours troubleshooting + 17.5 hours documentation) |
| **Objectives Achieved** | 12/12 (100%) |
| **Critical Findings** | 3 (ADCS ESC1, ESXi credential exposure, xp_cmdshell abuse) |
| **High Findings** | 2 (AS-REP Roasting, weak password policy) |
| **Systems Compromised** | Domain Controller, SQL Server, ESXi Hypervisor, Guest VMs |
| **Privilege Escalation Path** | Unauthenticated → Domain User → SYSTEM → Domain Admin → Hypervisor Root |

### Technical Environment

**Attack Platform:** Arch Linux (custom pentest build)  
**Target Environment:** CyberWarfare Labs AD-RTS Scenario 1  
**Scope:** Enterprise Windows Active Directory + VMware ESXi infrastructure

**Why Arch Linux?** Unlike Kali-based tutorials, this assessment required adapting 
tooling to a non-standard environment, demonstrating real-world problem-solving 
when standard tools don't work as expected. This mirrors corporate pentest 
environments where Kali may not be approved or available.

### Key Findings

**Critical Severity:**

1. **ADCS ESC1 Misconfiguration (CVSSv3: 9.8)**
   - Unrestricted Subject Alternative Name (SAN) in certificate templates
   - Enabled privilege escalation from domain user to Domain Administrator
   - Bypassed traditional privilege escalation paths via certificate authentication
   - **Business Impact:** Complete domain takeover, access to all 10,000+ customer records

2. **Cleartext ESXi Credentials in Active Directory (CVSSv3: 9.9)**
   - Hypervisor root credentials stored in plaintext in AD user notes field
   - Enabled infrastructure-wide compromise from single domain breach
   - **Business Impact:** Ransomware risk across all virtualized workloads, complete infrastructure rebuild required for recovery

3. **MSSQL xp_cmdshell Exploitation (CVSSv3: 9.0)**
   - Service account with sysadmin privileges and SeImpersonate token capability
   - Direct path to SYSTEM-level code execution on critical database server
   - **Business Impact:** Customer database exfiltration (PII, call records, billing data), regulatory violations

**High Severity:**

4. **Kerberos Pre-Authentication Disabled (CVSSv3: 7.5)**
   - AS-REP Roasting enabled offline credential theft without detection
   - Combined with weak password policy (cracked in seconds via dictionary attack)

5. **Inadequate Password Complexity Requirements**
   - Standard wordlist cracking succeeded against production credentials
   - Password reuse across critical infrastructure (MSSQL and ESXi)

### Remediation Highlights

**Immediate Actions Required:**
- Disable ESC1-vulnerable certificate templates or set "Enrollee Supplies Subject" to False
- Remove all cleartext credentials from Active Directory user/computer properties
- Revoke sysadmin privileges from non-essential accounts; disable xp_cmdshell
- Enable Kerberos pre-authentication for all user accounts
- Force password reset for all compromised accounts

**Strategic Recommendations:**
- Implement Privileged Access Management (PAM) solution for infrastructure credentials
- Deploy phishing-resistant MFA (FIDO2/WebAuthn) for administrative accounts
- Enforce 14+ character password policy with complexity requirements
- Implement certificate template audit process and regular ADCS security reviews
- Integrate SIEM alerting for ADCS enrollment activity and xp_cmdshell execution

---

## Technical Skills

**Offensive Security:**
- Active Directory exploitation (Kerberos attacks, ADCS abuse, DCSync)
- Windows privilege escalation (token manipulation, service exploitation)
- Credential harvesting (LSASS dumping, NTLM/Kerberos ticket extraction)
- Lateral movement (pass-the-hash, WMI, PowerShell remoting)
- Living-off-the-land techniques (minimal tool footprint, evasion)

**Infrastructure Security:**
- VMware ESXi/vCenter exploitation
- Database security assessment (MSSQL, PostgreSQL)
- Virtualization security (guest escape research, hypervisor attacks)
- Network services (DNS, LDAP, SMB, RPC)

**Development & Scripting:**
- Python (automation, API interaction, exploit development)
- PowerShell (post-exploitation, Windows automation)
- Bash (Linux automation, tool chaining)
- SQL (database enumeration, injection techniques)

**Tools & Frameworks:**
- **Reconnaissance:** Nmap, dig, ldapsearch, rpcclient
- **Exploitation:** Impacket suite, Metasploit, custom exploits
- **Post-Exploitation:** Mimikatz, pypykatz, GodPotato, Rubeus
- **ADCS:** Certipy, Certify, certificate abuse techniques
- **VMware:** pyVmomi, govc, ESXi exploitation frameworks
- **Password Cracking:** Hashcat (GPU), John the Ripper

**Operating Systems:**
- Arch Linux (daily driver - custom pentest build)
- Kali Linux (familiarity with standard tooling)
- Windows Server (2016/2019/2022 exploitation and hardening)
- Various Linux distributions (Ubuntu, CentOS, RHEL)

---

## Certifications

**Current:**
- CyberWarfare Labs: Active Directory Red Team Specialist (AD-RTS)

**In Progress:**
- Offensive Security Certified Professional (OSCP) - Scheduled
- Certified Red Team Operator (CRTO) - Scheduled

---

## Professional Approach

**Assessment Philosophy:**
- Business impact analysis ties technical findings to organizational risk
- Detailed remediation guidance enables blue team implementation
- Systematic troubleshooting demonstrates real-world operational constraints
- Professional documentation suitable for executive and technical audiences

**Why My Work Stands Out:**
1. **Real Problem-Solving:** 4.5 hours of documented troubleshooting shows 
   adaptability beyond scripted tutorials
2. **Blue Team Perspective:** Understanding defensive controls (firewall evasion, 
   detection avoidance) from offensive operations
3. **Communication Skills:** Executive summaries, business impact analysis, and 
   technical depth for different stakeholder audiences
4. **Professional Standards:** Reports formatted for actual client delivery, not 
   just portfolio demonstrations

---

## Currently Seeking

**Target Roles:**
- Penetration Tester (Internal/External/Web Application)
- Red Team Operator
- Offensive Security Engineer (Purple Team preferred)
- Security Researcher (Active Directory focus)

**Ideal Environment:**
- Organizations with mature security programs seeking to test detection capabilities
- Companies transitioning from compliance-focused to adversary-focused security
- Teams emphasizing realistic attack simulation and purple team collaboration
- Environments that value documentation and knowledge sharing

**Location:** Las Vegas, Nevada (remote or hybrid preferred)

---

## Contact

**Email:** [your email]  
**LinkedIn:** [your LinkedIn profile]  
**Location:** Las Vegas, NV  

---

## Acknowledgments

This assessment was conducted in a controlled lab environment provided by 
CyberWarfare Labs (AD-RTS Scenario 1) for professional skill development and 
portfolio demonstration purposes. Special thanks to the CWL team for creating 
realistic training scenarios that mirror real-world enterprise environments.

---

*This portfolio demonstrates technical capabilities for employment consideration. 
All assessments were conducted in authorized lab environments. No unauthorized 
testing was performed.*
```

---

## LinkedIn Post Template (For Tomorrow)

**After CWL approval, post this on LinkedIn:**
```
I'm excited to share my latest penetration testing portfolio piece: a comprehensive 
Active Directory compromise assessment demonstrating the path from unauthenticated 
network access to complete infrastructure control.

🎯 Key Achievements:
- Complete domain compromise via ADCS ESC1 exploitation (certificate-based privilege escalation)
- ESXi hypervisor lateral movement using pyVmomi guest operations
- 12/12 assessment objectives achieved within 25 hours
- Professional-grade documentation with business impact analysis

🔧 Technical Highlights:
- Kerberos AS-REP Roasting for offline credential theft
- SeImpersonate token manipulation via GodPotato
- LSASS memory dumping for domain credential extraction
- VMware ESXi API exploitation for guest VM command execution

📊 What Makes This Different:
This assessment was conducted on Arch Linux (not Kali), requiring tool adaptation 
and systematic troubleshooting—demonstrating real-world constraints where standard 
tools don't work as expected. 4.5 hours of documented troubleshooting mirrors 
actual engagement challenges, not just successful exploitation.

The full report includes executive summary, MITRE ATT&CK mapping, regulatory 
compliance impact (GDPR/PCI-DSS/FCC), and detailed blue team remediation guidance.

🔗 Full portfolio: [your GitHub link]

Special thanks to CyberWarfare Labs for creating realistic training environments 
that prepare offensive security professionals for real-world engagements.

#PenetrationTesting #CyberSecurity #RedTeam #ActiveDirectory #InfoSec #OffensiveSecurity

---

I'm currently seeking opportunities in penetration testing, red team operations, 
or offensive security engineering roles. Open to relocation or remote positions.
```

**Why this works:**
- ✅ Specific achievements (numbers, techniques)
- ✅ Shows problem-solving (Arch Linux troubleshooting)
- ✅ Professional presentation (business impact, not just hacking)
- ✅ Call to action (seeking opportunities)
- ✅ Proper hashtags for visibility
- ✅ Attribution to CWL (professional courtesy)

---

## Application Strategy - Starting Tomorrow

### **Priority 1: Meta Purple Team Role**

**Timeline:** Apply within 24 hours of CWL approval

**Cover Letter (First Paragraph):**
```
I'm applying for the Offensive Security Engineer (Purple Team) position because 
my portfolio demonstrates the exact intersection of skills your team requires: 
advanced offensive capabilities with blue team operational awareness.

My recent Active Directory assessment showcases both successful exploitation 
(ADCS ESC1, token manipulation, hypervisor lateral movement) and systematic 
troubleshooting that mirrors real-world engagement constraints. Conducted on 
Arch Linux rather than Kali, this assessment required adapting standard tools 
when they failed—exactly the problem-solving resilience your Purple Team needs 
when testing detection capabilities against novel attack paths.

[Continue with specific job requirement mapping...]
