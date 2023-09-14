import { useMutation, useQueryClient } from "react-query";
import { createBranch } from "../../api/project/branches";
import { useToast } from "../../hooks/useToast";
import { useSearchParams } from "react-router-dom";
import { SetStateAction } from "react";

export const useCreateChapterBranch = (
	setOpened: React.Dispatch<SetStateAction<boolean>>
) => {
	const queryClient = useQueryClient();
	const [, setSearchParams] = useSearchParams();
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
				setSearchParams({ branch: data.uid });
				setOpened(false);
			},
			onError: (error) => {
				console.log(error);
				useToast("error", "Something went wrong... branch not created 😞");
			},
		}
	);
};
