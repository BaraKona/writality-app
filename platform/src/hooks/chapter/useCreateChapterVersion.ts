import { useMutation, useQueryClient } from "react-query";
import { createVersion } from "../../api/project/chapters";
import { useToast } from "../useToast";
export const useCreateChapterVersion = (
	chapterId: string,
	projectId: string
) => {
	const queryClient = useQueryClient();
	return useMutation(() => createVersion(projectId, chapterId), {
		onSuccess: ({ data }) => {
			useToast("success", `${data.message} 😃`);
			queryClient.setQueryData(
				["chapter", "versions", chapterId],
				(old: any) => {
					return [data.version, ...old];
				}
			);
		},
		onError: (error: any) => {
			useToast("error", "something went wrong, version not created 😖");
		},
	});
};
