import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-grey': '#ECF0F1',
        'dark-charcoal': '#2C3E50',
        'pure-white': '#FFFFFF',
        'accent-blue': '#3498DB',
        'accent-blue-hover': '#2980B9'
      }
    },
  },
  plugins: [],
}
export default config