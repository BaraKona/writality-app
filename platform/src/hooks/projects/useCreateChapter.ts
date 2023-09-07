import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../useToast";
import { createProjectChapter } from "../../api/project/projects";

export const useCreateChapter = (projectId: string) => {
	const queryClient = useQueryClient();
	return useMutation(() => createProjectChapter(projectId), {
		onSuccess: () => {
			queryClient.invalidateQueries(["project", projectId]);
			queryClient.invalidateQueries(["chapters", projectId]);
			useToast("success", "Chapter created successfully 😃");
		},
		onError: () => {
			useToast("error", "something went wrong, chapter not created 😖");
		},
	});
};
