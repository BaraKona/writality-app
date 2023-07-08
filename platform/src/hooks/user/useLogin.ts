import { useMutation } from "react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useToast } from "../useToast";
import { loginUser } from "../../api/user";
export const useLogin = () => {
	const { setCurrentUser } = useAuthContext();
	return useMutation(["signUp"], (data: any) => loginUser(data), {
		onSuccess: (data) => {
			useToast("success", "Login Successful");
			setCurrentUser(data);
		},

		onError: ({ message }) => {
			useToast("error", message);
		},
	});
};
