import { useMutation, useQueryClient } from "react-query";
import { mergeReplaceMain } from "../../api/project/chapters";
import { useToast } from "../useToast";
import { useNavigate } from "react-router-dom";
import { IChapterContent } from "../../interfaces/IChapterContent";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
export const useMergeReplace = (project: string, chapter: string) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	return useMutation(
		async (branch: IChapterVersion) => {
			const { data } = await mergeReplaceMain(project, chapter, branch);
			return data;
		},
		{
			onSuccess: () => {
				useToast("success", "Chapter updated successfully 😃");
				queryClient.invalidateQueries(["chapter", chapter]);
				queryClient.invalidateQueries(["versions", chapter]);
				navigate(`/project/${project}/chapter/${chapter}`);
			},
			onError: () => {
				useToast("error", "Something went wrong... chapter not updated 😞");
			}
		}
	);
};
