import { useMutation } from "react-query";
import { registerUser } from "../../api/user";
import { useToast } from "../useToast";
export const useSignUp = () => {
	return useMutation(
		["signUp"],
		(data: { name: string; email: string; password: string }) =>
			registerUser(data),
		{
			onSuccess: (data) => {
				window.location.pathname = "/profile";
			},
			onError: ({ response }) => {
				console.log(response);
				useToast("error", response?.data?.message || "something went wrong");
			},
		}
	);
};
