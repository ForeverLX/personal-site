/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Red Galaxy Color Scheme
        'galaxy-bg': '#0a0a0a',
        'galaxy-bg-secondary': '#1a1a1a',
        'galaxy-bg-accent': '#0d0d0d',
        'galaxy-red': '#ff0040',
        'galaxy-red-secondary': '#cc0033',
        'galaxy-red-accent': '#ff4d6d',
        'galaxy-purple': '#8b3a8b',
        'galaxy-navy': '#1a1f3a',
        'galaxy-text': '#e0e0e0',
        'galaxy-text-secondary': '#a0a0a0',
        'galaxy-text-accent': '#ff0040',
        
        // Sunrise gradient colors (DARRIUS GRATE)
        'sunrise-orange': '#ff6b35',
        'sunrise-yellow': '#f7931e',
        'sunrise-pink': '#ff9a9e',
        
        // Sunset gradient colors (FOREVERLX)
        'sunset-red': '#ff0040',
        'sunset-purple': '#8b3a8b',
        'sunset-navy': '#1a1f3a',
      },
      backgroundImage: {
        'sunrise-gradient': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff9a9e 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #ff0040 0%, #8b3a8b 50%, #1a1f3a 100%)',
        'galaxy-gradient': 'linear-gradient(135deg, #ff0040 0%, #8b3a8b 50%, #1a1f3a 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #ff0040, 0 0 10px #ff0040, 0 0 15px #ff0040' },
          '100%': { boxShadow: '0 0 10px #ff0040, 0 0 20px #ff0040, 0 0 30px #ff0040' },
        },
      },
    },
  },
  plugins: [],
}

