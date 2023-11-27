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
			onSuccess: ({ history, version, title, dateUpdated }) => {
				queryClient.setQueryData(["chapter", chapterId], (old: any) => {
					return {
						...old,
						history,
						title,
						content: {
							...old.content,
							dateUpdated,
						},
					};
				});

				queryClient.setQueryData(
					["chapter", "versions", chapterId],
					(old?: any) => {
						if (!old) return [version];
						return [version, ...old];
					}
				);

				// useToast("success", "Chapter updated successfully 😃");
				// queryClient.invalidateQueries(["project", projectId]);
				// queryClient.invalidateQueries(["projects"]);
				// queryClient.invalidateQueries(["chapter", chapterId]);
				// queryClient.invalidateQueries(["chapter", "versions", chapterId]);
			},
			onError: () => {
				useToast("error", "something went wrong 😖");
			},
		}
	);
};
