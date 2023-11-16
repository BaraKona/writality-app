import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../useToast";
import { acceptFriendRequest } from "../../api/notification/notification";

export const useAcceptFriendRequest = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ userId, notificationId }: { userId: string; notificationId: string }) =>
			acceptFriendRequest(userId, notificationId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("notifications");
				useToast("success", "Friend request accepted.");
			},
			onError: () => {
				useToast("error", "An error occurred while accepting friend request.");
			},
		}
	);
};
