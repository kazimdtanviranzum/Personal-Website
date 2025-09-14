const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // set colors to tailwindcss theme
      colors: {
        primary: '#d877ff', // Add your first color
        secondary: '#8a36fe', // Add your second color
      },
    },

  },
  plugins: [],
});