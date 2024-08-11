/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      clipPath: {
        'full-square': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      },
      transform: ['hover'],
      transitionProperty: ['hover'],
      transitionDuration: ['hover'],
    },
  },
  plugins: [],
}

