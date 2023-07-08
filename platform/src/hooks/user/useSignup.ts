import { useMutation } from "react-query";
import { registerUser } from "../../api/user";
export const useSignUp = () => {
	return useMutation(["signUp"], (data: any) => registerUser(data), {
		onSuccess: (data) => {
			console.log(data);
		},
	});
};
