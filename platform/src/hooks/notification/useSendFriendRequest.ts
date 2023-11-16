import { useMutation } from "react-query";
import { sendFriendRequest } from "../../api/notification/notification";
import { useToast } from "../useToast";

export const useSendFriendRequest = () => {
	return useMutation((userId: string) => sendFriendRequest(userId), {
		onSuccess: () => {
			useToast("success", "Friend request sent");
		},
		onError: () => {
			useToast("error", "Something went wrong");
		},
	});
};
