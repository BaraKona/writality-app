import { useMutation, useQueryClient } from "react-query";
import { updateProjectTitle } from "../../api/project/projects";

export const useProjectTitleChange = (projectId: string, title: string) => {
	const queryClient = useQueryClient();
	return useMutation(() => updateProjectTitle(projectId, title), {
		onSuccess: (data) => {
			queryClient.setQueryData(["project", projectId], data);
			queryClient.invalidateQueries(["favourites"]);
		},
	});
};
