# Changelog

All notable changes to the Darrius Grate Red Team Portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-18

### Added
- **Interactive Terminal Component**
  - 25+ commands including help, whoami, about, projects, skills, contact
  - Attack simulation commands (kerberoast, golden-ticket, asrep, dcsync)
  - Easter egg commands (sudo, cowsay, sl, wget, ssh, telnet, man)
  - Command history navigation with up/down arrows
  - Tab completion for commands and arguments
  - Typo suggestions for invalid commands

- **Guided Tour Mode**
  - 9-step interactive walkthrough of portfolio
  - Educational content about red team journey
  - Automatic progression with Enter key
  - Portfolio feature explanations

- **MITRE ATT&CK Matrix**
  - Interactive visualization of 10 mapped techniques with 70% automation
  - Color-coded proficiency levels (Full, Partial, None)
  - Detailed technique cards with descriptions
  - Filter options by coverage level
  - Direct links to MITRE documentation

- **Live GitHub Stats Integration**
  - Real-time API integration with auto-refresh
  - Commit streak and total commits display
  - Repository statistics (public repos, stars, followers)
  - Recent activity with timestamps
  - Graceful error handling for API failures

- **Contact Form System**
  - Formspree integration for email submissions
  - Client-side validation with error handling
  - Success/error message display
  - Accessibility improvements (ARIA labels, autocomplete)

- **Video Background System**
  - Compressed homepage background video
  - Sunrise/sunset intro videos with text masks
  - Responsive video sizing for mobile devices
  - Muted autoplay for mobile compatibility

- **Comprehensive Documentation**
  - QA testing report with 3-layer methodology
  - Security architecture and threat model
  - Technical architecture decisions and trade-offs
  - Terminal commands reference guide
  - Performance optimization documentation
  - Lessons learned and growth insights

### Changed
- **Next.js Security Update**
  - Updated from 14.2.5 to 14.2.33 to fix critical vulnerabilities
  - All dependencies updated and audited

- **Mobile Responsiveness**
  - Navigation breakpoint changed from md (768px) to lg (1024px)
  - Logo sizing reduced from 350px to 180px for mobile compatibility
  - Text viewBox widened from 1200px to 1600px to prevent cutoff
  - Responsive font sizing implemented (65px-140px based on viewport)

- **Accessibility Improvements**
  - Added ARIA labels to hamburger menu button
  - Improved color contrast (text-gray-600 → text-gray-400)
  - Added comprehensive form labels and autocomplete attributes
  - Skip-to-content link for keyboard navigation

- **Performance Optimizations**
  - Bundle size optimized (87.7kB shared, 160kB homepage)
  - Code splitting implemented for terminal component
  - Image optimization with Next.js Image component
  - Video compression with FFmpeg (CRF 28)

### Fixed
- **Terminal History Navigation**
  - Fixed closure issue with command history using useRef instead of useState
  - Up/down arrow navigation now works correctly
  - Command history persists during session

- **Tour Mode State Management**
  - Fixed step progression and state machine
  - Removed prompt interference from tour mode
  - Tour mode now completes all 9 steps reliably

- **Formspree Integration**
  - Fixed 403/422 errors by switching from JSON to FormData
  - Added proper Accept header for API calls
  - Enhanced error logging for debugging

- **Contact Information Consistency**
  - Updated all email references to contact@darriusgrate.com
  - Corrected Twitter handle to @DarriusGrate
  - Updated GitHub username to ForeverLX
  - Fixed all social media links

- **Navigation and Links**
  - Fixed broken footer quick links (changed from hash anchors to page routes)
  - Updated all project repository links to correct GitHub URLs
  - Ensured all internal navigation works correctly

- **Security Headers**
  - Implemented comprehensive Content Security Policy
  - Added X-Frame-Options, X-Content-Type-Options, Referrer-Policy
  - Configured Permissions-Policy header
  - All external links use rel="noopener noreferrer"

### Security
- **Content Security Policy Implementation**
  - Strict CSP headers prevent unauthorized script execution
  - Justified unsafe-eval for xterm.js terminal library
  - Justified unsafe-inline for Tailwind CSS and Next.js optimizations
  - External domains whitelisted (api.github.com, formspree.io, googletagmanager.com)

- **Input Validation**
  - All user inputs validated and sanitized
  - Contact form email validation with regex
  - Terminal command parsing with whitelist approach
  - No unsafe JavaScript practices (eval, dangerouslySetInnerHTML)

- **Dependency Security**
  - Regular npm audit scans performed
  - All critical vulnerabilities patched immediately
  - Dependencies kept up-to-date
  - Security headers verified in production

### Performance
- **Bundle Size Optimization**
  - Homepage: 160kB (target: <200kB) ✅
  - Shared bundle: 87.7kB (target: <100kB) ✅
  - Other pages: 126-136kB (target: <150kB) ✅

- **Lighthouse Scores**
  - Performance: 95+ (target: >90) ✅
  - Accessibility: 95+ (target: >90) ✅
  - Best Practices: 95+ (target: >90) ✅
  - SEO: 95+ (target: >90) ✅

- **Core Web Vitals**
  - Largest Contentful Paint: <2.0s (target: <2.5s) ✅
  - First Input Delay: <50ms (target: <100ms) ✅
  - Cumulative Layout Shift: <0.05 (target: <0.1) ✅

### Documentation
- **Comprehensive QA Report**
  - 3-layer testing methodology documented
  - All test results and quality metrics recorded
  - Known limitations documented (iPhone SE edge case)
  - 10+ hours of systematic testing documented

- **Security Documentation**
  - Threat model and attack vectors documented
  - Defense-in-depth strategy explained
  - Incident response plan outlined
  - Security testing results recorded

- **Architecture Documentation**
  - Technical decisions and trade-offs explained
  - Component architecture documented
  - Performance optimization strategies outlined
  - Future scalability considerations documented

- **Terminal Commands Reference**
  - Complete command reference with usage examples
  - Attack simulation explanations
  - Easter egg documentation
  - Interactive features guide

### Known Issues
- **iPhone SE 1st Gen (2016)**
  - Minor navigation display issues on 320px width
  - Intro video text may have slight cutoff
  - Device is 9+ years old with <1% market share
  - Modern devices (iPhone 12+, Android equivalents) work perfectly
  - Documented as non-blocking limitation

---

## [0.9.0] - 2025-01-15

### Added
- Initial portfolio structure with Next.js 14
- Basic pages (Home, About, Projects, Research, Services, Contact)
- Tailwind CSS styling and responsive design
- Framer Motion animations

### Changed
- Project structure organized with App Router
- Component architecture established

### Fixed
- Initial build and deployment setup

---

## [0.1.0] - 2025-01-01

### Added
- Project initialization
- Git repository setup
- Basic Next.js configuration
- Initial planning and architecture design

---

**Legend**:
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` for security improvements
- `Performance` for performance improvements
- `Documentation` for documentation updates
