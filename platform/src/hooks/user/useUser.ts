import { useQuery, useQueryClient } from "react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useToast } from "../useToast";
import { getUser } from "../../api/user";
import { useSocket } from "../../Providers/SocketProvider";

export const useUser = () => {
	const { setCurrentUser } = useAuthContext();
	// const { subscribeToChannel } = useSocket();
	const queryClient = useQueryClient();

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
