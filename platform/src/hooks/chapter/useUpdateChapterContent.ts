import { useMutation, useQueryClient } from "react-query";
import { updateChapterContent } from "../../api/project/chapters";
import { useToast } from "../useToast";

export const useUpdateChapterContent = (
	projectId: string,
	chapterId: string,
	title: string
) => {
	const queryClient = useQueryClient();
	return useMutation(
		(content: { content: string; wordCount: number }) =>
			updateChapterContent({
				projectId,
				chapterId,
				content: content.content,
				title,
				wordCount: content.wordCount,
			}),
		{
			onSuccess: (data) => {
				useToast("success", "Chapter updated successfully 😃");
				queryClient.invalidateQueries(["project", projectId]);
				queryClient.invalidateQueries(["projects"]);
				queryClient.invalidateQueries(["chapter", chapterId]);
				queryClient.invalidateQueries(["versions", chapterId]);
			},
			onError: () => {
				useToast("error", "something went wrong 😖");
			},
		}
	);
};
