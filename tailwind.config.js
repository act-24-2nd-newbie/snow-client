import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        header: '#6C77A7'
      },
      fontFamily: {
        sans: ['Noto Sans KR', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
