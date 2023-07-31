import { useMutation, useQueryClient } from "react-query";
import { createBranch } from "../../api/project/branches";
import { useToast } from "../../hooks/useToast";

export const useCreateChapterBranch = () => {
	const queryClient = useQueryClient();

	return useMutation(
		async (branch: {
			title: string;
			content: string;
			projectId: string;
			chapterId: string;
			name: string;
		}) => {
			const data = await createBranch(branch);
			return data;
		},
		{
			onSuccess: (data) => {
				useToast("success", "Branch created successfully 😃");
				queryClient.invalidateQueries("chapterBranches");
			},
			onError: (error) => {
				console.log(error);
				useToast("error", "Something went wrong... branch not created 😞");
			},
		}
	);
};
