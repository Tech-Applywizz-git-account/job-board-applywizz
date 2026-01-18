/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary-bg': '#FFFFFF',
        'secondary-bg': '#F8F9FA',
        'neon-green': '#00E676',
        'bright-blue': '#2D6CFF',

        // Text Colors
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
        'text-muted': '#999999',

        // Accent Colors for Tags
        'accent-orange': '#FF6B35',
        'accent-yellow': '#FFD23F',
        'accent-pink': '#FF6B9D',
        'accent-cyan': '#00E5FF',
        'accent-purple': '#A855F7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(41, 254, 41, 0.5)',
        'glow-green-lg': '0 0 40px rgba(41, 254, 41, 0.6)',
        'glow-blue': '0 0 20px rgba(44, 118, 255, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
