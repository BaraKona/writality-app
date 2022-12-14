/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#191a23",
        baseLight: "#38312d85",
        baseMid: "#1b1c25",
        baseLighter: "#2d2f38",
        baseBorder: "#363130",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
