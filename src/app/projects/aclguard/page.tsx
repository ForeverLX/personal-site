'use client'

import { motion } from 'framer-motion'
import DetailPageLayout from '@/components/DetailPageLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export default function ACLGuardProjectPage() {
  const features = [
    {
      icon: '🔍',
      title: 'Real-time ACL Monitoring',
      description: 'Continuously monitors Active Directory ACLs for suspicious changes and privilege escalations.'
    },
    {
      icon: '⚡',
      title: 'Privilege Escalation Detection',
      description: 'Advanced algorithms to detect potential privilege escalation paths through ACL analysis.'
    },
    {
      icon: '🛡️',
      title: 'Custom Rule Engine',
      description: 'Flexible rule-based system for custom security policies and compliance requirements.'
    },
    {
      icon: '📊',
      title: 'Detailed Reporting',
      description: 'Comprehensive reports with visualizations and actionable security recommendations.'
    }
  ]

  const milestones = [
    {
      date: 'Q4 2024',
      title: 'Initial Development',
      description: 'Core ACL parsing and analysis engine'
    },
    {
      date: 'Q1 2025',
      title: 'Real-time Monitoring',
      description: 'Added live monitoring capabilities'
    },
    {
      date: 'Q2 2025',
      title: 'Rule Engine',
      description: 'Custom rule system implementation'
    },
    {
      date: 'Q3 2025',
      title: 'Advanced Analytics',
      description: 'Machine learning-based threat detection'
    }
  ]

  const basicUsageCode = `#include <stdio.h>
#include <windows.h>
#include "aclguard.h"

int main() {
    ACLGuardConfig config = {
        .domain = "corp.local",
        .monitor_interval = 30,
        .log_level = LOG_INFO
    };
    
    ACLGuard* guard = aclguard_init(&config);
    if (!guard) {
        fprintf(stderr, "Failed to initialize ACLGuard\\n");
        return 1;
    }
    
    // Start monitoring
    if (aclguard_start_monitoring(guard) != 0) {
        fprintf(stderr, "Failed to start monitoring\\n");
        aclguard_cleanup(guard);
        return 1;
    }
    
    printf("ACLGuard monitoring started successfully\\n");
    
    // Keep running
    getchar();
    
    aclguard_cleanup(guard);
    return 0;
}`

  const advancedConfigCode = `// Advanced configuration example
ACLGuardConfig config = {
    .domain = "corp.local",
    .monitor_interval = 15,
    .log_level = LOG_DEBUG,
    .custom_rules = {
        .count = 3,
        .rules = {
            {
                .name = "Sensitive Group Changes",
                .pattern = "CN=Domain Admins,CN=Users",
                .action = ALERT_IMMEDIATE
            },
            {
                .name = "Service Account ACLs",
                .pattern = "CN=Service Accounts",
                .action = ALERT_DAILY
            },
            {
                .name = "Guest Account Access",
                .pattern = "CN=Guest,CN=Users",
                .action = ALERT_WEEKLY
            }
        }
    },
    .output_format = OUTPUT_JSON,
    .enable_ml_detection = true
};`

  return (
    <DetailPageLayout 
      title="ACLGuard v2.0"
      subtitle="Advanced Active Directory ACL Monitoring & Privilege Escalation Detection"
      breadcrumb={{ label: "Projects", href: "/#projects" }}
    >
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mr-6">
              <span className="text-4xl">🔐</span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                ACLGuard v2.0
              </h1>
              <p className="text-xl text-gray-300">
                Advanced Active Directory ACL Analysis Tool
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Active Development</span>
            </div>
            <div className="text-gray-500">•</div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>⭐</span>
              <span>24</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>🍴</span>
              <span>8</span>
            </div>
            <div className="text-gray-500">•</div>
            <span className="text-sm text-gray-400">C</span>
            <div className="text-gray-500">•</div>
            <span className="text-sm text-gray-400">MIT License</span>
          </div>
        </motion.div>

        {/* Overview */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
          <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-8">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              ACLGuard v2.0 is a next-generation Active Directory security tool designed to detect 
              and prevent privilege escalation attacks through comprehensive ACL analysis. Built for 
              red team operators and security professionals, it provides real-time monitoring of 
              critical AD objects and identifies potential attack paths.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">The Problem</h3>
                <p className="text-gray-300">
                  Active Directory ACLs are often misconfigured, creating hidden privilege escalation 
                  paths that attackers can exploit. Traditional security tools miss these subtle 
                  configurations that can lead to domain compromise.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">The Solution</h3>
                <p className="text-gray-300">
                  ACLGuard continuously monitors AD ACLs, applies advanced analysis algorithms, 
                  and provides actionable insights to prevent privilege escalation attacks before 
                  they can be exploited.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Key Features */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6 hover:border-red-500/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">{feature.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Architecture */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Architecture</h2>
          <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30 mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">ACL Parser</h3>
                <p className="text-gray-300 text-sm">
                  Extracts and parses Active Directory ACLs from domain controllers
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30 mx-auto mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Analysis Engine</h3>
                <p className="text-gray-300 text-sm">
                  Applies security rules and ML algorithms to detect threats
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30 mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Reporting</h3>
                <p className="text-gray-300 text-sm">
                  Generates detailed reports and security recommendations
                </p>
              </div>
            </div>
            
            <Callout type="info" title="System Requirements">
              <ul className="space-y-2">
                <li>• Windows 10/11 or Windows Server 2016+</li>
                <li>• Domain admin privileges for full functionality</li>
                <li>• Minimum 4GB RAM, 1GB disk space</li>
                <li>• Network access to domain controllers</li>
              </ul>
            </Callout>
          </div>
        </motion.section>

        {/* Code Examples */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Code Examples</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Basic Usage</h3>
              <CodeBlock
                code={basicUsageCode}
                language="c"
                title="Basic ACLGuard Initialization"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Advanced Configuration</h3>
              <CodeBlock
                code={advancedConfigCode}
                language="c"
                title="Custom Rules and ML Detection"
              />
            </div>
          </div>
        </motion.section>

        {/* Installation Guide */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Installation Guide</h2>
          <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Prerequisites</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Visual Studio 2022 or GCC 9.0+</li>
                  <li>• Windows SDK 10.0.19041.0 or later</li>
                  <li>• Domain admin privileges</li>
                  <li>• Network connectivity to domain controllers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Build from Source</h3>
                <CodeBlock
                  code={`git clone https://github.com/ForeverLX/ACLGuard-v2.0-Active-Directory-Recon-.git
cd ACLGuard
mkdir build && cd build
cmake ..
make -j4
sudo make install`}
                  language="bash"
                  title="Build Commands"
                  showLineNumbers={false}
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Configuration</h3>
                <p className="text-gray-300 mb-4">
                  Create a configuration file to customize ACLGuard behavior:
                </p>
                <CodeBlock
                  code={`# aclguard.conf
domain = "corp.local"
monitor_interval = 30
log_level = "INFO"
output_format = "JSON"
enable_ml_detection = true

[custom_rules]
rule1 = "CN=Domain Admins,CN=Users:ALERT_IMMEDIATE"
rule2 = "CN=Service Accounts:ALERT_DAILY"`}
                  language="ini"
                  title="Configuration File"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Development Journey */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Development Journey</h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.date}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="flex-shrink-0 w-24 text-sm text-gray-400 font-medium">
                  {milestone.date}
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full mt-1"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-300">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technical Details */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Technical Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['C', 'Windows API', 'LDAP', 'JSON', 'SQLite', 'OpenSSL'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Performance</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Memory Usage:</span>
                  <span className="text-green-400">~50MB</span>
                </div>
                <div className="flex justify-between">
                  <span>CPU Usage:</span>
                  <span className="text-green-400">~2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Scan Speed:</span>
                  <span className="text-green-400">1000+ objects/sec</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div
          className="text-center border-t border-gray-700/50 pt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="flex justify-center space-x-8 mb-6">
            <a
              href="https://github.com/ForeverLX/ACLGuard-v2.0-Active-Directory-Recon-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-xl">🐙</span>
              <span>GitHub Repository</span>
            </a>
            <a
              href="https://github.com/ForeverLX/ACLGuard-v2.0-Active-Directory-Recon-/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-xl">🐛</span>
              <span>Report Issues</span>
            </a>
          </div>
          
          <Callout type="success" title="Contributing">
            We welcome contributions! Please read our contributing guidelines and submit pull requests 
            for any improvements or bug fixes.
          </Callout>
        </motion.div>
      </div>
    </DetailPageLayout>
  )
}
