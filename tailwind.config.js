/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        yekan: ['YekanBakh', 'sans-serif']
      },
      colors: {
        'primary-gray': '#212121',
        'primary-gray-1': '#f5f5f5',
        'primary-blue': '#002b8a',
        'primary-blue-1': '#2261ed',
        'primary-blue-2': '#eff9ff',
        'primary-orange': '#ff6a00',
        'primary-orange-1': '#e05f00'
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-3px, 3px)' },
          '50%': { transform: 'translate(3px, -3px)' },
          '75%': { transform: 'translate(-3px, -3px)' }
        },
        'wave-border': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0.5' }
        }
      },
      animation: {
        shake: 'shake 3s ease-in-out infinite',
        'wave-border': 'wave-border 2s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
