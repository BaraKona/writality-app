import { useMutation } from "react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useToast } from "../useToast";
import { loginUser } from "../../api/user";
export const useLogin = () => {
	return useMutation(["signUp"], (data: any) => loginUser(data), {
		onSuccess: (data) => {
			useToast("success", "login successful! Taking you to platform");
			// wait 3 sec then redirect to platform
			setTimeout(() => {
				window.location.href = "/";
			}, 2000);
		},
		onError: ({ message }) => {
			useToast("error", message);
		},
	});
};
