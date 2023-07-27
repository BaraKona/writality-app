export const tabStyles = {
	root: {
		color: "#394251",
	},
	tabsList: {
		borderRight: "none",
		borderTopRightRadius: "0px",
		borderBottomRightRadius: "0px",
		paddingRight: "8px",
	},
	tab: {
		backgroundColor: "#f2f2f2",
		color: "#394251",
		border: "1px solid #e3e3e3",
		marginBottom: "2px",
		borderTopLeftRadius: "0px",
		borderBottomLeftRadius: "0px",
		fontSize: "0.8rem",
		borderRadius: "0.25rem",
		padding: "6px",
		transition: "all 0.2s ease-in-out",
		alignItems: "center",
		justifyContent: "center",
		"&:hover": {
			color: "#000",
			backgroundColor: "white",
			borderColor: "#ebebeb",
			boxShadow:
				"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
		},
		"&[data-active]": {
			color: "#394251",
			backgroundColor: "white",
			boxShadow:
				"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
			borderColor: "#ebebeb",
		},
		"&[data-active]:hover": {
			borderColor: "#ebebeb",
		},
	},
};
