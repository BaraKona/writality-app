import { signOutUser } from "../../api/user";
import { useMutation } from "react-query";
export const useSignout = () => {
	return useMutation(() => signOutUser(), {
		onSuccess: () => {
			window.location.pathname = "/";
		},
	});
};
