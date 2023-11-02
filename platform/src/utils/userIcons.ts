export const initialsColor = (name: string) => {
	const colors = [
		"text-lime-600",
		"text-green-600",
		"text-emerald-600",
		"text-teal-600",
		"text-cyan-600",
		"text-lightBlue-600",
		"text-blue-600",
		"text-indigo-600",
		"text-violet-600",
		"text-purple-600",
		"text-fuchsia-600",
		"text-pink-600",
		"text-rose-600",
	];

	const index = name.length % colors.length;

	return colors[index];
};

export const initials = (name: string) => {
	return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
};
