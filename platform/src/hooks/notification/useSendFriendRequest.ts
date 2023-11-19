import { useMutation, useQueryClient } from "react-query";
import { sendFriendRequest } from "../../api/notification/notification";
import { useToast } from "../useToast";

export const useSendFriendRequest = () => {
	const queryClient = useQueryClient();
	return useMutation((userId: string) => sendFriendRequest(userId), {
		onSuccess: () => {
			queryClient.invalidateQueries("user");
			useToast("success", "Friend request sent");
		},
		onError: ({ message }) => {
			useToast("error", message);
		},
	});
};
