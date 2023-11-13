import { useMutation, useQueryClient } from "react-query";
import { acceptProjectInvitation } from "../../api/notification/notification";
import { useToast } from "../useToast";
import { error } from "console";

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
			onSuccess: ({}) => {
				useToast("success", "Invitation accepted successfully.");
				queryClient.invalidateQueries("user");
			},
			onError: (error: any) => {
				console.log(error);
				useToast("error", error?.response?.data?.message || error.message);
			},
		}
	);
};
