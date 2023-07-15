import { useMutation, useQueryClient } from "react-query";
import { createVersion } from "../../api/project/versions";
import { useToast } from "../useToast";
export const useCreateChapterVersion = (
	chapterId: string,
	projectId: string
) => {
	const queryClient = useQueryClient();
	return useMutation(
		(content: string) => createVersion(chapterId, projectId, content),
		{
			onSuccess: () => {
				useToast("success", "Version created successfully 😃");
				queryClient.invalidateQueries(["versions", chapterId]);
			},
			onError: () => {
				useToast("error", "something went wrong, version not created 😖");
			},
		}
	);
};
