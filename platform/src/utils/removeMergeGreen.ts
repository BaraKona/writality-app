export function removeMergeGreen(richtext: string): string {
	const parser = new DOMParser();
	const doc = parser.parseFromString(richtext, "text/html");
	const elementsToRemove = doc.querySelectorAll("[style*='rgb(0, 184, 148)']");

	elementsToRemove.forEach((element) => {
		const style = element.getAttribute("style") || "";
		const newStyle = style.replace(
			/color:\s*rgb\s*\(\s*0\s*,\s*184\s*,\s*148\s*\);?/gi,
			""
		);
		element.setAttribute("style", newStyle);
	});

	return doc.body.innerHTML;
}
