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

export const collaborationTypeColourHex = (type: string) => {
  switch (type) {
    case "Accountability":
      return "#3b82f6";
    case "Collaboration":
      return "#10b981";
    case "Critique":
      return "#ef4444";
    case "Feedback":
      return "#f59e0b";
    case "Other":
      return "#6b7280";
    default:
      return "#3b82f6";
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
