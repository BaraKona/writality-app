import { useToast } from "../useToast";
import { useMutation, useQueryClient } from "react-query";
import { sendProjectInvite } from "../../api/notification/notification";

export const useSendProjectInvites = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({ projectId, userId }: { projectId: string; userId: string }) =>
			sendProjectInvite(projectId, userId),
		{
			onSuccess: ({ projectId }) => {
				queryClient.invalidateQueries(["project", projectId]);
				useToast("success", "Invite sent");
			},
			onError: () => {
				useToast("error", "Something went wrong");
			},
		}
	);
};
