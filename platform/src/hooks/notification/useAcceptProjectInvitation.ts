import { useMutation, useQueryClient } from "react-query";
import { acceptProjectInvitation } from "../../api/notification/notification";
import { useToast } from "../useToast";

export const useAcceptProjectInvitation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({
			notificationId,
			projectId,
		}: {
			notificationId: string;
			projectId: string;
		}) => acceptProjectInvitation(notificationId, projectId),
		{
			onSuccess: () => {
				useToast("success", "Invitation accepted successfully.");
				queryClient.invalidateQueries("user");
			},
			onError: () => {
				useToast("error", "Invitation acceptance failed.");
			},
		}
	);
};
