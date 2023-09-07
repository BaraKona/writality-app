import { useQuery, useQueryClient } from "react-query";
import { getOpenFolderChapters } from "../../api/project/projects";
import { useToast } from "../useToast";
export const useOpenFolderChapters = (projectId: string, folderId: string) => {
	const queryClient = useQueryClient();
	return useQuery(
		["openFolderChapters", folderId],
		() => getOpenFolderChapters(projectId, folderId),
		{
			enabled: Boolean(projectId && folderId),
			onSuccess: (data) => {
				queryClient.setQueryData(["open-folder", folderId], data);
			},
			onError: (error) => {
				console.log(error);
				useToast("error", "Error fetching chapters");
			},
		}
	);
};
