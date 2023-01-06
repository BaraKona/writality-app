/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#191a22",
        baseLight: "#38312d85",
        baseMid: "#1b1c24",
        baseLighter: "#2d2f38",
        baseBorder: "#363130",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
