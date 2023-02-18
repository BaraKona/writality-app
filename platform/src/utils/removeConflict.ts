export function removeConflict(richtext: string): string {
	// const parser = new DOMParser();
	// const doc = parser.parseFromString(richtext, "text/html");
	// const elementsToRemove = doc.querySelectorAll(
	// 	"span[style*='text-decoration: line-through']"
	// );

	// elementsToRemove.forEach((element) => {
	// 	element.parentNode?.removeChild(element);
	// });
	const parser = new DOMParser();
	const doc = parser.parseFromString(richtext, "text/html");
	const elementsToRemove = doc.querySelectorAll("del, s, strike");

	elementsToRemove.forEach((element) => {
		element.parentNode?.removeChild(element);
	});

	return doc.body.innerHTML;
}
