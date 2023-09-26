import { signOutUser } from "../../api/user";
import { useMutation } from "react-query";
import { useToast } from "../useToast";

export const useSignout = () => {
	return useMutation(() => signOutUser(), {
		onSuccess: () => {
			useToast("success", "You are now signed out!");
			window.location.pathname = "/";
		},
		onError: () => {
			useToast("error", "Something went wrong, we could not sign you out 😔");
		},
	});
};
