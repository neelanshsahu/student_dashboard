/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#060b18',
        },
        // Status colors
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
      },
      animation: {
        'fade-in':    'fadeIn 0.45s ease both',
        'slide-up':   'slideUp 0.55s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in':   'slideInLeft 0.4s ease both',
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer':    'shimmer 2.2s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'spin-slow':  'spin 8s linear infinite',
        'bounce-sm':  'bounceSm 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:   { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideInLeft: { from: { opacity: 0, transform: 'translateX(-24px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          from: { boxShadow: '0 0 20px rgba(99,102,241,0.2), 0 0 60px rgba(99,102,241,0.05)' },
          to:   { boxShadow: '0 0 30px rgba(139,92,246,0.35), 0 0 80px rgba(139,92,246,0.1)' },
        },
        bounceSm: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-4px)' },
        },
      },
      backdropBlur: { xs: '2px', '4xl': '72px' },
      boxShadow: {
        'card':      '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-md':   '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        'indigo':    '0 4px 20px rgba(99,102,241,0.25)',
        'indigo-lg': '0 8px 40px rgba(99,102,241,0.35)',
        'glow':      '0 0 40px rgba(99,102,241,0.2)',
        'auth':      '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
}
