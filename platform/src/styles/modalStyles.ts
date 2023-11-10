export function modalStyles(mode: string) {
	const modalStyle = {
		content: {
			background: mode === "dark" ? "#191a23" : "white",
			border: "1px solid gray",
			color: mode === "dark" ? "white" : "#394251",
		},
		header: {
			background: mode === "dark" ? "#191a23" : "white",
			color: mode === "dark" ? "white" : "#394251",
			borderBottom: "none",
		},
		title: {
			color: mode === "dark" ? "white" : "#394251",
		},
	};

	return modalStyle;
}
