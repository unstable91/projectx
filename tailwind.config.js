/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        leetcode: {
          dark: '#1a1a1a',
          darker: '#141414',
          card: '#282828',
          border: '#3a3a3a',
          hover: '#333333',
          yellow: '#ffa116',
          green: '#2cbb5d',
          red: '#ef4743',
          blue: '#007aff'
        }
      }
    },
  },
  plugins: [],
}
