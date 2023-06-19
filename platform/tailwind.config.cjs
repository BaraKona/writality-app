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
				blueText: "#394251",
			},
			grid: {
				"3xl": "1600px",
				"4xl": "2000px",
				"5xl": "2400px",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
