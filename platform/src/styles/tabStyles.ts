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
		padding: "8px",
		transition: "all 0.2s ease-in-out",
		"&:hover": {
			color: "#000",
			backgroundColor: "transparent",
			borderColor: "#e3e3e3",
		},
		"&[data-active]": {
			color: "#000",
			backgroundColor: "transparent",
			borderColor: "#e3e3e3",
		},
		"&[data-active]:hover": {
			borderColor: "#e3e3e3",
		},
	},
};
