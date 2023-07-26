export const collaborationTypeColour = (type: string) => {
	switch (type) {
		case "Accountability":
			return "blue";
		case "Collaboration":
			return "cyan";
		case "Critique":
			return "red";
		case "Feedback":
			return "yellow";
		case "Other":
			return "gray";
		default:
			return "blue";
	}
};

export const postTypeColour = (type: string) => {
	switch (type) {
		case "Short Story":
			return "indigo";
		case "Novel":
			return "violet";
		case "Poem":
			return "teal";
		case "Script":
			return "orange";
		case "Manga / Comic":
			return "lime";
		case "Fan-Fiction":
			return "green";
		case "Web-Novel":
			return "pink";
		case "Other":
			return "gray";
		default:
			return "blue";
	}
};
