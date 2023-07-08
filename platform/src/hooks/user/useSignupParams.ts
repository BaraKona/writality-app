import { useSearchParams } from "react-router-dom";

export function useSignUpSearchParams() {
	const [params] = useSearchParams();

	const name = params.get("name") || undefined;
	const nameParts = name?.split(" ");
	const firstName = nameParts?.[0];
	const lastName = nameParts?.[1];

	const email = params.get("email") || undefined;
	const ref = params.get("ref") || undefined;

	return {
		firstName,
		lastName,
		email: email?.toLowerCase(),
		ref,
	};
}
