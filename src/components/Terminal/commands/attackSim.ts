export interface AttackPhase {
  name: string;
  steps: AttackStep[];
}

export interface AttackStep {
  action: string;
  status: 'pending' | 'running' | 'completed' | 'warning';
  result?: string;
  detection?: string;
}

export interface AttackSimulation {
  name: string;
  mitreId: string;
  description: string;
  phases: AttackPhase[];
  automation: {
    tool: string;
    github: string;
    feature: string;
  };
  detection: string[];
  links: {
    research: string;
    mitre: string;
  };
}

export const attackSimulations: Record<string, AttackSimulation> = {
  kerberoast: {
    name: "Kerberoasting",
    mitreId: "T1558.003",
    description: "Extract service account credentials by requesting Kerberos service tickets",
    phases: [
      {
        name: "Reconnaissance",
        steps: [
          { action: "Enumerating domain users...", status: "running" },
          { action: "Found 47 user accounts", status: "completed", result: "47 users identified" },
          { action: "Identified 12 SPNs", status: "completed", result: "12 service principal names found" },
          { action: "Event ID 4769 (TGS requests)", status: "warning", detection: "TGS requests logged" }
        ]
      },
      {
        name: "TGS Request",
        steps: [
          { action: "Requesting service tickets...", status: "running" },
          { action: "Obtained TGS for MSSQLSvc/sql01", status: "completed", result: "MSSQLSvc/sql01.corp.local" },
          { action: "Obtained TGS for HTTP/web01", status: "completed", result: "HTTP/web01.corp.local" },
          { action: "Unusual SPN patterns", status: "warning", detection: "Multiple TGS requests from single user" }
        ]
      },
      {
        name: "Offline Cracking",
        steps: [
          { action: "Extracting Kerberos 5 TGS-REP hashes...", status: "running" },
          { action: "2 hashes extracted", status: "completed", result: "Hashcat format: $krb5tgs$23$" },
          { action: "None (offline activity)", status: "warning", detection: "No network-based detection" }
        ]
      },
      {
        name: "Privilege Escalation",
        steps: [
          { action: "Cracked credentials: svc_sql:Password123", status: "completed", result: "Weak password identified" },
          { action: "Validated against domain", status: "completed", result: "Domain authentication successful" },
          { action: "Failed login attempts", status: "warning", detection: "Event ID 4625 - Failed logons" }
        ]
      }
    ],
    automation: {
      tool: "ACLGuard v2.0",
      github: "github.com/ForeverLX/aclguard-v2",
      feature: "Automated Kerberoasting with AI target selection"
    },
    detection: [
      "Monitor Event ID 4769 for unusual SPN requests",
      "Alert on multiple TGS requests from single user",
      "Correlate with Event ID 4768 (TGT requests)",
      "Implement honeypot SPNs"
    ],
    links: {
      research: "/research/kerberoasting-deep-dive",
      mitre: "attack.mitre.org/techniques/T1558/003"
    }
  },

  "golden-ticket": {
    name: "Golden Ticket",
    mitreId: "T1558.001",
    description: "Create forged Kerberos TGT using domain controller's KRBTGT account hash",
    phases: [
      {
        name: "Privilege Escalation",
        steps: [
          { action: "Compromising domain controller...", status: "running" },
          { action: "DCSync attack successful", status: "completed", result: "KRBTGT hash obtained" },
          { action: "Event ID 4662 (object access)", status: "warning", detection: "DCSync activity logged" }
        ]
      },
      {
        name: "Ticket Creation",
        steps: [
          { action: "Forging Kerberos TGT...", status: "running" },
          { action: "Golden ticket created", status: "completed", result: "10-year validity period" },
          { action: "None (offline activity)", status: "warning", detection: "No network-based detection" }
        ]
      },
      {
        name: "Domain Persistence",
        steps: [
          { action: "Accessing domain resources...", status: "running" },
          { action: "Domain admin access achieved", status: "completed", result: "Full domain control" },
          { action: "Event ID 4768 (TGT requests)", status: "warning", detection: "Unusual TGT patterns" }
        ]
      }
    ],
    automation: {
      tool: "ACLGuard v2.0",
      github: "github.com/ForeverLX/aclguard-v2",
      feature: "Automated Golden Ticket generation and validation"
    },
    detection: [
      "Monitor for DCSync events (Event ID 4662)",
      "Alert on KRBTGT account access",
      "Detect unusual TGT request patterns",
      "Implement golden ticket detection rules"
    ],
    links: {
      research: "/research/golden-ticket-attacks",
      mitre: "attack.mitre.org/techniques/T1558/001"
    }
  },

  "as-rep-roast": {
    name: "AS-REP Roasting",
    mitreId: "T1558.004",
    description: "Extract user credentials by requesting AS-REP for users with pre-authentication disabled",
    phases: [
      {
        name: "User Enumeration",
        steps: [
          { action: "Enumerating users with pre-auth disabled...", status: "running" },
          { action: "Found 3 vulnerable users", status: "completed", result: "DONT_REQ_PREAUTH flag set" },
          { action: "Event ID 4768 (AS-REQ)", status: "warning", detection: "AS-REQ requests logged" }
        ]
      },
      {
        name: "AS-REP Request",
        steps: [
          { action: "Requesting AS-REP tickets...", status: "running" },
          { action: "AS-REP obtained for admin@corp.local", status: "completed", result: "Encrypted with user's password" },
          { action: "Unusual AS-REQ patterns", status: "warning", detection: "Multiple AS-REQ from single source" }
        ]
      },
      {
        name: "Offline Cracking",
        steps: [
          { action: "Extracting AS-REP hashes...", status: "running" },
          { action: "1 hash extracted", status: "completed", result: "Hashcat format: $krb5asrep$23$" },
          { action: "None (offline activity)", status: "warning", detection: "No network-based detection" }
        ]
      }
    ],
    automation: {
      tool: "ACLGuard v2.0",
      github: "github.com/ForeverLX/aclguard-v2",
      feature: "Automated AS-REP Roasting with user enumeration"
    },
    detection: [
      "Monitor Event ID 4768 for AS-REQ requests",
      "Alert on users with pre-authentication disabled",
      "Detect unusual AS-REQ patterns",
      "Implement AS-REP roasting detection rules"
    ],
    links: {
      research: "/research/as-rep-roasting-techniques",
      mitre: "attack.mitre.org/techniques/T1558/004"
    }
  },

  dcsync: {
    name: "DCSync",
    mitreId: "T1003.006",
    description: "Extract password hashes from domain controller using directory replication",
    phases: [
      {
        name: "Privilege Escalation",
        steps: [
          { action: "Acquiring domain admin privileges...", status: "running" },
          { action: "Domain admin access achieved", status: "completed", result: "Administrator account compromised" },
          { action: "Event ID 4624 (successful logon)", status: "warning", detection: "Domain admin logon" }
        ]
      },
      {
        name: "DCSync Attack",
        steps: [
          { action: "Initiating directory replication...", status: "running" },
          { action: "KRBTGT hash extracted", status: "completed", result: "Domain controller secrets obtained" },
          { action: "Event ID 4662 (object access)", status: "warning", detection: "DCSync activity detected" }
        ]
      },
      {
        name: "Hash Extraction",
        steps: [
          { action: "Extracting user password hashes...", status: "running" },
          { action: "47 user hashes extracted", status: "completed", result: "NTLM and Kerberos hashes" },
          { action: "Event ID 4662 (object access)", status: "warning", detection: "Replication service access" }
        ]
      }
    ],
    automation: {
      tool: "ACLGuard v2.0",
      github: "github.com/ForeverLX/aclguard-v2",
      feature: "Automated DCSync with stealth techniques"
    },
    detection: [
      "Monitor Event ID 4662 for replication service access",
      "Alert on unusual directory replication requests",
      "Detect DCSync-specific API calls",
      "Implement DCSync detection rules"
    ],
    links: {
      research: "/research/dcsync-attack-methodology",
      mitre: "attack.mitre.org/techniques/T1003/006"
    }
  },

  "lateral-movement": {
    name: "Lateral Movement",
    mitreId: "T1570",
    description: "Move through network using compromised credentials and remote services",
    phases: [
      {
        name: "Credential Harvesting",
        steps: [
          { action: "Harvesting credentials from memory...", status: "running" },
          { action: "3 sets of credentials obtained", status: "completed", result: "Domain user credentials" },
          { action: "Event ID 4624 (logon events)", status: "warning", detection: "Multiple logon events" }
        ]
      },
      {
        name: "Target Discovery",
        steps: [
          { action: "Enumerating network targets...", status: "running" },
          { action: "12 workstations identified", status: "completed", result: "Windows 10/11 systems" },
          { action: "Event ID 4624 (network logon)", status: "warning", detection: "Network authentication" }
        ]
      },
      {
        name: "Remote Execution",
        steps: [
          { action: "Executing commands on remote systems...", status: "running" },
          { action: "5 systems compromised", status: "completed", result: "Remote code execution successful" },
          { action: "Event ID 4624 (remote logon)", status: "warning", detection: "Remote authentication" }
        ]
      }
    ],
    automation: {
      tool: "Lab Playbooks",
      github: "github.com/ForeverLX/security-portfolio",
      feature: "Documented lateral movement lab playbook"
    },
    detection: [
      "Monitor for unusual network authentication patterns",
      "Alert on remote code execution attempts",
      "Detect lateral movement indicators",
      "Implement network segmentation monitoring"
    ],
    links: {
      research: "/research/lateral-movement-strategies",
      mitre: "attack.mitre.org/techniques/T1570"
    }
  }
};

export function getAttackSimulation(technique: string): AttackSimulation | null {
  return attackSimulations[technique.toLowerCase()] || null;
}

export function getAllAttackTechniques(): string[] {
  return Object.keys(attackSimulations);
}
