import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f5',
          100: '#ffe4ec',
          200: '#fecdd8',
          300: '#fda4bf',
          400: '#fb719b',
          500: '#f43f6b',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
      boxShadow: {
        soft: '0 10px 30px -15px rgba(244,63,107,0.35)',
      },
    },
  },
  plugins: [],
}

export default config

