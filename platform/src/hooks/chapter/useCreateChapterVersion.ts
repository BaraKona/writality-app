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
			console.log(data);
			useToast("success", `${data.message} 😃`);
			queryClient.setQueryData(["versions", chapterId], (old: any) => {
				return [...old, data.version];
			});
		},
		onError: () => {
			useToast("error", "something went wrong, version not created 😖");
		},
	});
};
