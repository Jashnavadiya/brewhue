

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
      screens: {
        'mobiles': '320px',     // For screens >= 320px
        'mobilem': '375px',     // For screens >= 375px
        'mobilel': '425px',     // For screens >= 425px
        'tab': '426px',     // For screens >= 426px
      },
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.1, 0.7, 1.0, 0.1)", // Customize timing curve
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}