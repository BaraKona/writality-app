export const initialsColor = (name: string) => {
	return "text-coolGrey-7 dark:text-coolGrey-4";
};

export const initials = (name: string) => {
	if (!name) return "??";

	return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
};
