import { useMutation } from "react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useToast } from "../useToast";
import { loginUser } from "../../api/user";
export const useLogin = () => {
	return useMutation(["signUp"], (data: any) => loginUser(data), {
		onSuccess: (data) => {
			if (data.uid) {
				useToast("success", "login successful! Taking you to platform");
				// wait 3 sec then redirect to platform
				setTimeout(() => {
					window.location.href = "/";
				}, 2000);
			} else {
				useToast("error", data.response.data.message);
			}
		},
		onError: ({ message }) => {
			useToast("error", message);
		},
	});
};
