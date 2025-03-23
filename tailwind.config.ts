import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary-gray': {
          DEFAULT: 'var(--primary-gray)',
          1: 'var(--primary-gray-1)'
        },
        'primary-blue': {
          DEFAULT: 'var(--primary-blue)',
          1: 'var(--primary-blue-1)',
          2: 'var(--primary-blue-2)'
        },
        'primary-orange': {
          DEFAULT: 'var(--primary-orange)',
          1: 'var(--primary-orange-1)'
        }
      },
      fontFamily: {
        sans: ['YekanBakh', 'sans-serif']
      }
    }
  },
  plugins: [],
  important: true // This ensures Tailwind styles take precedence
}

export default config
