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
      }
    }
  },
  plugins: []
}
