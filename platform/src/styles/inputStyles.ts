import { useThemeContext } from "../Providers/ThemeProvider";

export const inputStyles = () => {
	const { theme } = useThemeContext();

	return {
		input: {
			borderColor:
				theme === "dark" ? "#394251 !important" : "#e2e2e2 !important",
			borderRadius: "0.375rem !important",
			border:
				theme === "dark"
					? "1px solid #394251 !important"
					: "1px solid #e2e2e2 !important",
			color: theme === "dark" ? "#fff" : "#000",
			fontSize: "0.75rem !important",
			marginBottom: "0.5rem",
			backgroundColor: "none",
			"&:focus": {
				outline: "none",
				border: "none",
				backgroundColor: "black",
				"--tw-ring-color": "transparent",
			},
			input: {
				border: "none",
				fontSize: "0.75rem",
			},
		},
		label: {
			color: theme === "dark" ? "#fff" : "#000",
			fontSize: "0.75rem",
			fontWeight: 600,
		},
	};
};
