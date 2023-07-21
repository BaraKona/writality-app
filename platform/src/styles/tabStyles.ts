export const tabStyles = {
	root: {
		color: "#394251",
	},
	tabsList: {
		borderRight: "1px solid #e3e3e3",
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
		borderRadius: "0.375rem",
		padding: "4px",
		transition: "all 0.2s ease-in-out",
		alignItems: "center",
		justifyContent: "center",
		"&:hover": {
			color: "#000",
			backgroundColor: "transparent",
			borderColor: "#e2e2e2",
		},
		"&[data-active]": {
			color: "#394251",
			backgroundColor: "#e2e2e2",
			borderColor: "#e2e2e2",
		},
		"&[data-active]:hover": {
			borderColor: "#e2e2e2",
		},
	},
};
