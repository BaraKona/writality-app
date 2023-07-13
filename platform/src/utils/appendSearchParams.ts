export function appendSearchParams(
	currentParams: URLSearchParams,
	newParams: Record<string, string | undefined>
) {
	const newParamsEntries = Object.entries(newParams).filter(
		([, value]) => !!value
	) as [string, string][];
	new URLSearchParams(newParamsEntries).forEach((value, key) => {
		currentParams.set(key, value);
	});
	return currentParams;
}
