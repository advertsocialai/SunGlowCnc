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
        brand: {
          navy: {
            50:  '#f0f3ff',
            100: '#e0e7ff',
            200: '#c4d0fa',
            300: '#9aaeef',
            400: '#6b86df',
            500: '#4a65cc',
            600: '#2a3d8a',
            700: '#1C2B5E',
            800: '#162050',
            900: '#0f1535',
          },
          red: {
            50:  '#fff2f3',
            100: '#fde0e2',
            200: '#fbbdc2',
            300: '#f8909a',
            400: '#f46072',
            500: '#e03040',
            600: '#C8202E',
            700: '#a01820',
            800: '#7a0f16',
            900: '#5a0a10',
          },
        },
        // keep for backwards compat
        primary: {
          50:  '#fff2f3',
          100: '#fde0e2',
          200: '#fbbdc2',
          300: '#f8909a',
          400: '#f46072',
          500: '#e03040',
          600: '#C8202E',
          700: '#a01820',
          800: '#7a0f16',
          900: '#5a0a10',
        },
        dark: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
