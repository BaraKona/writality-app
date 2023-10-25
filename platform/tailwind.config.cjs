/** @type {import('tailwindcss').Config} */
module.exports = {
	corePlugins: {
		preflight: true,
	},
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				baseColour: "#f2f2f2",
				base: "#fff",
				border: "#ebebeb",
				coolGrey: "#374151",
				blueTextLight: "#868e99",
				coolGrey: [
					"#f6f7f9",
					"#F3F4F6",
					"#E5E7EB",
					"#D1D5DB",
					"#9CA3AF",
					"#6B7280",
					"#4B5563",
					"#374151",
					"#1F2937",
					"#111827",
				],
				primary: "#fafafafa",
				// gray: "#ebebeb",
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
