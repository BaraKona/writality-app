/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				baseColour: "#f2f2f2",
				baseLight: "#ffffff",
				baseMid: "#f2f2f2",
				baseBorderDark: "#fff",
				baseLighter: "#ffff",
				baseBorder: "#fff",
				lightBorder: "rgb(229, 231, 235)",
				base: "#fff",
				border: "#ebebeb",
				blueText: "#394251",
				blueTextLight: "#868e96",

				primary: "#f5f5f5f5",
				secondary: "#fafafafa",
				tertiary: "#f2f2f2f2",
				gray: "#ebebeb",
			},
			grid: {
				"3xl": "1600px",
				"4xl": "2000px",
				"5xl": "2400px",
			},
			borderRadius: {
				normal: "0.25rem",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
