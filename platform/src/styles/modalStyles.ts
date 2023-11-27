import { useThemeContext } from "../Providers/ThemeProvider";

export function modalStyles(mode: string) {
	const { theme } = useThemeContext();

	const modalStyle = {
		content: {
			background: theme === "dark" ? "#191a23" : "white",
			border: "none",
			color: theme === "dark" ? "white" : "#394251",
			borderRadius: "10px",
		},
		header: {
			background: theme === "dark" ? "#191a23" : "white",
			color: theme === "dark" ? "white" : "#394251",
			borderBottom: "none",
		},
		title: {
			color: theme === "dark" ? "white" : "#394251",
		},
	};

	return modalStyle;
}
