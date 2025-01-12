

const {nextui} = require("@nextui-org/react");


/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fthird: '#080604',   // Add your custom color with a name
        ffirst: '#f8f8f8',  // You can add multiple colors
        fsecond: '#777777',   // Example of more custom colors
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}