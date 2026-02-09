# Red Team Portfolio

> **Professional red team operator and security researcher**  
> Build-first offensive security portfolio with projects, writeups, and research

[![Next.js](https://img.shields.io/badge/Next.js-14.2.33-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

## 📊 Project Stats

![GitHub last commit](https://img.shields.io/github/last-commit/ForeverLX/red-team-portfolio?style=flat-square)
![GitHub code size](https://img.shields.io/github/languages/code-size/ForeverLX/red-team-portfolio?style=flat-square)
![Lines of code](https://img.shields.io/tokei/lines/github/ForeverLX/red-team-portfolio?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/ForeverLX/red-team-portfolio?style=social)

## 🚀 Live Demo

**Portfolio:** [darriusgrate.vercel.app](https://darriusgrate.vercel.app)  
**GitHub:** [github.com/ForeverLX/Red-Team-Portfolio](https://github.com/ForeverLX/Red-Team-Portfolio)

## 📸 Portfolio Highlights

### Interactive Terminal
![Homepage with Terminal](public/screenshots/homepage-terminal.png)
*Full-featured terminal with 25+ commands, guided tour, and attack simulations*

### MITRE ATT&CK Coverage Matrix
![MITRE Matrix](public/screenshots/mitre-matrix.png)
*Interactive visualization of 5 techniques mapped to active tooling coverage*

### Technical Depth
![Technique Detail](public/screenshots/mitre-technique-detail.png)
*Detailed technique cards showing automation level, tools, and MITRE ATT&CK integration*

## ✨ Features

### 🖥️ Interactive Terminal
- **25+ Commands**: `help`, `whoami`, `projects`, `skills`, `contact`, `tour`, `attack-sim`
- **Guided Tour**: 9-step interactive walkthrough of the portfolio
- **Attack Simulations**: Kerberoasting, Golden Ticket, AS-REP Roasting demos
- **Easter Eggs**: `sudo`, `cowsay`, `sl`, `telnet`, `man`, `wget`, `ssh`
- **Command History**: Up/down arrow navigation
- **Tab Completion**: Smart command suggestions

### 🎯 MITRE ATT&CK Matrix
- **5 MITRE ATT&CK Techniques**: Interactive coverage visualization tied to ACLGuard automation
- **Real-time Stats**: Coverage percentages and technique counts
- **Detailed Cards**: Click any technique for full details
- **Filter Options**: View by coverage level (Full, Partial, None)
- **External Links**: Direct links to MITRE documentation

### 📊 Live GitHub Stats
- **Real-time Data**: Auto-refreshes every 5 minutes
- **Commit Streak**: Current streak and total commits
- **Repository Stats**: Public repos, stars, followers
- **Recent Activity**: Last 5 commits with timestamps
- **Error Handling**: Graceful fallbacks for API issues

### 🎨 Visual Design
- **Dual Identity**: Sunrise/Sunset theme with professional typography
- **Responsive Layout**: Optimized for desktop and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Optimized videos, lazy loading, code splitting

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14.2.33** - React framework with App Router (latest security patches)
- **TypeScript 5.0** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first styling

### Interactive Components
- **xterm.js 5.5.0** - Terminal emulator
- **Framer Motion 11.0.0** - Animation library
- **React 18** - UI library

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ForeverLX/Red-Team-Portfolio.git
   cd Red-Team-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id" > .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Formspree Configuration
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id_here

# GitHub Configuration
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username

# Google Analytics Configuration
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Base URL Configuration
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Environment Variable Details

**NEXT_PUBLIC_FORMSPREE_ID**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy the form ID (e.g., `mjkalgaj`)
4. Add to `.env.local`

**NEXT_PUBLIC_GITHUB_USERNAME**
- Your GitHub username for live stats integration
- Used by the GitHub API to fetch repository and activity data

**NEXT_PUBLIC_GA_ID**
- Your Google Analytics measurement ID (format: G-XXXXXXXXXX)
- Sign up at [analytics.google.com](https://analytics.google.com)

**NEXT_PUBLIC_BASE_URL**
- Your production domain URL
- Used for metadata and SEO (e.g., `https://darriusgrate.com`)
- Defaults to `http://localhost:3001` in development

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   ├── projects/          # Project showcase
│   ├── research/          # Research topics
│   └── layout.tsx         # Root layout with metadata
├── components/            # React components
│   ├── Terminal/          # Interactive terminal
│   │   ├── Terminal.tsx   # Main terminal component
│   │   ├── TourMode.ts    # Guided tour logic
│   │   ├── commands/      # Terminal commands
│   │   └── utils/         # Terminal utilities
│   ├── MitreMatrix/       # MITRE ATT&CK matrix
│   │   ├── MitreMatrix.tsx
│   │   ├── TechniqueCard.tsx
│   │   └── data/          # Coverage data
│   └── ...                # Other components
├── hooks/                 # Custom React hooks
│   └── useGitHubStats.ts  # GitHub API integration
├── lib/                   # Utility libraries
│   └── constants.ts       # Application constants
└── styles/                # Global styles
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in dashboard
   - Deploy automatically

3. **Environment Variables in Vercel**
   - `NEXT_PUBLIC_FORMSPREE_ID`: Your Formspree form ID
   - `NEXT_PUBLIC_GITHUB_USERNAME`: Your GitHub username
   - `NEXT_PUBLIC_GA_ID`: Your Google Analytics measurement ID
   - `NEXT_PUBLIC_BASE_URL`: Your production URL (e.g., `https://darriusgrate.com`)

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Use `npm run build && npm run export`
- **Railway**: Direct deployment from GitHub
- **DigitalOcean App Platform**: Node.js app with build command `npm run build`

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Homepage loads** - Videos play, terminal initializes
- [ ] **Tour mode** - Completes all 9 steps without errors
- [ ] **Navigation** - All links work (Projects, Research, About, Contact)
- [ ] **Contact form** - Submits successfully
- [ ] **GitHub stats** - Display correctly and auto-refresh
- [ ] **MITRE Matrix** - Interactive features work
- [ ] **Mobile responsive** - Layout works on phone viewport
- [ ] **Accessibility** - Keyboard navigation, screen reader support

### Performance Testing

- [ ] **Lighthouse audit** - 90+ on all metrics
- [ ] **Video loading** - Compressed files load quickly
- [ ] **Terminal responsiveness** - Commands execute smoothly
- [ ] **Cross-browser** - Chrome, Firefox, Safari compatibility

## 🔒 Security Features

- **Security Headers**: X-Frame-Options, CSP, X-Content-Type-Options
- **Input Sanitization**: All user inputs properly handled
- **API Rate Limiting**: GitHub API calls respect rate limits
- **Environment Variables**: Sensitive data not exposed in client code
- **Error Boundaries**: Graceful error handling for production

## 🎯 Key Commands

### Terminal Commands
```bash
help          # Show all available commands
whoami        # Display developer information
projects      # List all projects
skills        # Show technical skills
contact       # Display contact information
tour          # Start guided tour
attack-sim    # Run attack simulations
clear         # Clear terminal
history       # Show command history
```

### Attack Simulations
```bash
attack-sim kerberoast    # Kerberoasting demonstration
attack-sim golden-ticket # Golden Ticket attack
attack-sim asrep         # AS-REP Roasting
attack-sim dcsync        # DCSync attack
```

## 📈 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: Optimized with code splitting

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📖 Documentation

Comprehensive technical documentation is available in the [`docs/`](docs/) folder:

### Core Documentation
- **[QA Report](docs/QA-REPORT.md)** - Comprehensive testing methodology and results (3-layer testing)
- **[Security](docs/SECURITY.md)** - Threat model, security architecture, and defensive measures
- **[Architecture](docs/ARCHITECTURE.md)** - Technical decisions, trade-offs, and system design
- **[Terminal Commands](docs/TERMINAL-COMMANDS.md)** - Complete command reference and usage guide
- **[Performance](docs/PERFORMANCE.md)** - Optimization strategies and performance budgets
- **[Lessons Learned](docs/LESSONS-LEARNED.md)** - Technical challenges, insights, and growth

### Project Management
- **[Changelog](CHANGELOG.md)** - Version history and release notes
- **[Contributing](CONTRIBUTING.md)** - Guidelines for contributors and collaborators
- **[License](LICENSE)** - MIT License terms and conditions

### Setup & Configuration
- **[Environment Variables](.env.example)** - Configuration template and setup instructions

This documentation demonstrates professional development practices, systematic thinking, and security-first architecture - key qualities for red team operations.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Connect

- **Portfolio**: [darriusgrate.vercel.app](https://darriusgrate.vercel.app)
- **GitHub**: [github.com/ForeverLX](https://github.com/ForeverLX)
- **LinkedIn**: [linkedin.com/in/darrius-grate](https://www.linkedin.com/in/darrius-grate)
- **Twitter**: [@DarriusGrate](https://x.com/DarriusGrate)
- **Email**: [contact@darriusgrate.com](mailto:contact@darriusgrate.com)

## 🙏 Acknowledgments

- **MITRE ATT&CK Framework** - For the comprehensive security framework
- **xterm.js** - For the excellent terminal emulator
- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations

---

**Built with ❤️ and lots of ☕ by [Darrius Grate](https://github.com/ForeverLX)**