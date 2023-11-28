import { useMutation } from "react-query";
import { useToast } from "../useToast";
import { loginUser } from "../../api/user";
export const useLogin = () => {
	return useMutation(["login"], (data: any) => loginUser(data), {
		onSuccess: (data) => {
			useToast("success", "login successful! Taking you to platform");
			// wait 3 sec then redirect to platform
			setTimeout(() => {
				window.location.href = "/";
			}, 2000);
		},
		onError: ({ response }) => {
			useToast(
				"error",
				response?.data?.message || "something went wrong, please try again"
			);
		},
	});
};
