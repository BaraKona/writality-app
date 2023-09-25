import { useMutation, useQueryClient } from "react-query";
import { moveProjectChapterIntoFolder } from "../../api/project/projects";
import { useToast } from "../useToast";

export const useMoveChapterToFolder = (projectId: string) => {
	const queryClient = useQueryClient();

	return useMutation(
		({ chapterId, folderId }: { chapterId: string; folderId: string }) =>
			moveProjectChapterIntoFolder(projectId, chapterId, folderId),
		{
			onSuccess: (folderId) => {
				queryClient.invalidateQueries(["project", projectId]);
				queryClient.invalidateQueries(["chapters", projectId]);
				queryClient.invalidateQueries(["projects"]);
				useToast("success", "Chapter moved to folder successfully 😃");
			},
			onError: () => {
				useToast("error", "Something went wrong, chapter not moved 😖");
			},
		}
	);
};
