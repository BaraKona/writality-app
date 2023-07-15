import { useMutation, useQueryClient } from "react-query";
import { updateChapterContent } from "../../api/project/chapters";
import { useToast } from "../useToast";

export const useUpdateChapterContent = (
	projectId: string,
	chapterId: string
) => {
	const queryClient = useQueryClient();
	return useMutation(
		(content: string) => updateChapterContent(projectId, chapterId, content),
		{
			onSuccess: (data) => {
				useToast("success", "Chapter updated successfully 😃");
				queryClient.invalidateQueries(["chapter", chapterId]);
				queryClient.invalidateQueries(["versions", chapterId]);
			},
			onError: () => {
				useToast("error", "something went wrong 😖");
			},
		}
	);
};
