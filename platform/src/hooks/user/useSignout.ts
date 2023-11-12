import { signOutUser } from "../../api/user";
import { useMutation } from "react-query";
import { useToast } from "../useToast";
import { useSocket } from "../../Providers/SocketProvider";

export const useSignout = () => {
	const { disconnect } = useSocket();

	return useMutation(() => signOutUser(), {
		onSuccess: () => {
			useToast("success", "You are now signed out!");
			disconnect();
			window.location.pathname = "/";
		},
		onError: () => {
			useToast("error", "Something went wrong, we could not sign you out 😔");
		},
	});
};
