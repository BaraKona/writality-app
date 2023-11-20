import { useQuery } from "react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useToast } from "../useToast";
import { getUser } from "../../api/user";

export const useUser = () => {
	const { setCurrentUser } = useAuthContext();

	return useQuery(["user"], () => getUser(), {
		onSuccess: (data) => {
			setCurrentUser(data);
		},
		onError: ({ message }) => {
			useToast("error", "Could not log you in. Please try again");
		},
		retry: false,
	});
};
