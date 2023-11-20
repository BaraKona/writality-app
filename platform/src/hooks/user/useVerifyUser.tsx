import { useMutation } from "react-query";
import { useToast } from "../useToast";
import { verifyUser } from "../../api/user";

export function useVerifyUser() {
	return useMutation(verifyUser, {
		onSuccess: () => {
			useToast("success", "Account verified");
		},
		onError: (error: Error) => {
			useToast("error", error.message);
		},
	});
}
