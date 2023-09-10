import { useMutation, useQueryClient } from "react-query";
import { updateProjectTitle } from "../../api/project/projects";
import { useToast } from "../useToast";

export const useProjectTitleChange = (projectId: string, title: string) => {
	const queryClient = useQueryClient();
	return useMutation(() => updateProjectTitle(projectId, title), {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["project", projectId]);
			queryClient.invalidateQueries(["projects"]);
			useToast("success", "Project title updated successfully 😃");
		},
		onError: (err: any) => {
			useToast("error", "something went wrong 😖");
		},
	});
};
