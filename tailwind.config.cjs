/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forge-black': '#121212',
        'gunmetal-gray': '#1E1E1E',
        'chrome-silver': '#D0D0D0',
        'steel-blue': '#4A90E2',
        'molten-orange': '#FF6B2D',
        'ember-red': '#E63946',
        'cool-cyan': '#38BDF8',
      },
    },
  },
  plugins: [],
} 