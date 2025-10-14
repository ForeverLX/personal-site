# Red Team Portfolio Website

A modern, sophisticated portfolio website showcasing the transition from professional consulting to red team operations. Built with Next.js 14, Tailwind CSS, and Framer Motion.

## Features

- **Dual Identity Design**: Showcases both professional (DARRIUS GRATE) and hacker (FOREVERLX) identities
- **Red Galaxy Aesthetic**: Unique visual identity with dark theme and red nebula accents
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **MDX Support**: Ready for blog posts and research documentation
- **Performance Optimized**: Built with Next.js 14 App Router for optimal performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Content**: MDX for blog/research posts
- **Deployment**: Vercel (recommended)

## Prerequisites

Before running this project, you need to have Node.js installed on your system. If you don't have it installed:

### Arch Linux
```bash
sudo pacman -S nodejs npm
```

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install nodejs npm
```

### macOS
```bash
brew install node
```

### Windows
Download and install from [nodejs.org](https://nodejs.org/)

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── DualIdentityHeader.tsx  # Main dual identity header
│   ├── HeroSection.tsx         # Hero section component
│   ├── Layout.tsx              # Main layout wrapper
│   ├── Navigation.tsx          # Navigation component
│   └── Footer.tsx              # Footer component
└── lib/                # Utility functions and configurations
```

## Color Scheme

### Primary Colors
- **Background**: `#0a0a0a` (pure dark)
- **Secondary Background**: `#1a1a1a` (slightly lighter)
- **Accent Dark**: `#0d0d0d`

### Red Galaxy Accents
- **Primary Red**: `#ff0040` (vibrant red)
- **Secondary Red**: `#cc0033` (deeper red)
- **Accent Red**: `#ff4d6d` (lighter red/pink)
- **Purple Accent**: `#8b3a8b` (for depth)
- **Navy Accent**: `#1a1f3a` (deep space blue)

### Text Colors
- **Primary Text**: `#e0e0e0` (light gray)
- **Secondary Text**: `#a0a0a0` (medium gray)
- **Accent Text**: `#ff0040` (red)

## Dual Identity Gradients

### DARRIUS GRATE (Professional)
- **Sunrise Gradient**: `linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff9a9e 100%)`

### FOREVERLX (Hacker Handle)
- **Sunset Gradient**: `linear-gradient(135deg, #ff0040 0%, #8b3a8b 50%, #1a1f3a 100%)`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Customization

### Adding New Pages
1. Create a new file in `src/app/` directory
2. Export a default React component
3. Add navigation link in `src/components/Navigation.tsx`

### Modifying Colors
Update the color scheme in `tailwind.config.ts` under the `colors` section.

### Adding Animations
Use Framer Motion components and variants defined in the existing components as reference.

## Contributing

This is a personal portfolio project, but suggestions and improvements are welcome.

## License

Private project - All rights reserved.

