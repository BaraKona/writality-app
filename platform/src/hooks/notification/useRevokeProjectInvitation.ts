import { useToast } from "../useToast";
import { useMutation, useQueryClient } from "react-query";
import { revokeProjectInvite } from "../../api/notification/notification";

export const useRevokeProjectInvitation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({ projectId, userId }: { projectId: string; userId: string }) =>
			revokeProjectInvite(projectId, userId),
		{
			onSuccess: ({ projectId }) => {
				queryClient.invalidateQueries(["project", projectId]);
				useToast("success", "Invitation revoked");
			},
			onError: () => {
				useToast("error", "Something went wrong");
			},
		}
	);
};
