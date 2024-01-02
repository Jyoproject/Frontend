/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'footer': '#5C49F5'
      },
      backgroundImage: {
        'signin': "url('/public/images/signin.jpg')",
      }
    },
  },
  plugins: [],
}

