/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          100: "#FF5FAA"
        },
        green: {
          100: "#66FF7B"
        }
      }
    },
  },
  plugins: [],
});

