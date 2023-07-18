import { useMutation } from "react-query";
import { registerUser } from "../../api/user";
export const useSignUp = () => {
	return useMutation(
		["signUp"],
		(data: { name: string; email: string; password: string }) =>
			registerUser(data),
		{
			onSuccess: (data) => {
				window.location.pathname = "/library";
			},
		}
	);
};
