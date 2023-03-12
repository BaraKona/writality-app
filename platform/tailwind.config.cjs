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
				baseLight: "#1b1e24",
				baseMid: "#1b1c24",
				baseBorderDark: "#232329",
				baseLighter: "#2d2f38",
				baseBorder: "#363130",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
