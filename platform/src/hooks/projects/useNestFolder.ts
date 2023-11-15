import { useMutation, useQueryClient } from "react-query";
import { nestFolder } from "../../api/project/projects";
import { useToast } from "../useToast";

export const useNestFolder = (projectId: string) => {
	const queryClient = useQueryClient();

	return useMutation(
		({ folderId, parentId }: { folderId: string; parentId: string }) =>
			nestFolder(projectId, folderId, parentId),
		{
			onSuccess: (folderId) => {
				queryClient.invalidateQueries(["project", projectId]);
				queryClient.invalidateQueries(["chapters", projectId]);
				queryClient.invalidateQueries(["projects"]);
				useToast("success", "Folder nested successfully 😃");
			},
			onError: () => {
				useToast("error", "Something went wrong, folder not nested 😖");
			},
		}
	);
};
