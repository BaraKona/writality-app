import { useMutation, useQueryClient } from "react-query";
import { acceptProjectInvitation } from "../../api/notification/notification";
import { useToast } from "../useToast";
import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export const useAcceptProjectInvitation = () => {
	const queryClient = useQueryClient();
	const [sidebarNav, setSidebarNav] = useLocalStorage({
		key: "sidebarNav",
	});
	const navigate = useNavigate();

	return useMutation(
		({
			notificationId,
			projectId,
		}: {
			notificationId: string;
			projectId: string;
		}) => acceptProjectInvitation(notificationId, projectId),
		{
			onSuccess: ({ projectId }) => {
				useToast("success", "Invitation accepted successfully.");
				queryClient.invalidateQueries("user");
				queryClient.invalidateQueries("projects");
				setSidebarNav("collaborations");

				setTimeout(() => {
					navigate(`/project/${projectId}/overview`);
				}, 2000);
			},
			onError: (error: any) => {
				console.log(error);
				useToast("error", error?.response?.data?.message || error.message);
			},
		}
	);
};
