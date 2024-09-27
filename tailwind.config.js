import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        header: '#6C77A7',
        primary: '#2A82F0',
        secondary: '#CCCCCC',
      },
      fontFamily: {
        sans: ['Noto Sans KR', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
