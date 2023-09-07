import { createChapter } from "../../api/project/chapters";
import { createProjectChapter } from "../../api/project/projects";
import { useToast } from "../useToast";
import { useMutation, useQueryClient } from "react-query";

export const useCreateChapter = (projectId: string) => {
	const queryClient = useQueryClient();
	return useMutation(() => createProjectChapter(projectId), {
		onSuccess: () => {
			useToast("success", "Chapter created successfully 😃");
			queryClient.invalidateQueries(["chapters", projectId]);
		},
		onError: () => {
			useToast("error", "something went wrong, chapter not created 😖");
		},
	});
};
