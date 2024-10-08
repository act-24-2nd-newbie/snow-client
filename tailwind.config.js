import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        header: '#6C77A7',
        primary: '#2A82F0',
        'primary-hover': 'color-mix(in srgb, #2a82f0 80%, black 20%)',
        secondary: '#CCCCCC',
        warn: '#D15050',
        'welcome-foreground': '#2C3E50',
        tasks: '#F4F4F4',
      },
      fontFamily: {
        sans: ['Noto Sans KR', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
