export function modalStyles(mode: string) {
	const modalStyle = {
		content: {
			background: mode === "dark" ? "#191a23" : "white",
			border: "1px solid gray",
			color: "#394251",
		},
		header: {
			background: mode === "dark" ? "#191a23" : "white",
			borderBottom: "none",
		},
		title: {
			color: "#394251",
		},
	};

	return modalStyle;
}
