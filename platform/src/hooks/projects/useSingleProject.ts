import { useQuery, useQueryClient } from "react-query";
import { getSingleProject } from "../../api/project/projects";

export const useSingleProject = (projectId: string) => {
	const queryClient = useQueryClient();
	return useQuery(["project", projectId], () => getSingleProject(projectId), {
		onSuccess: (data) => {
			queryClient.setQueryData(["project", projectId], data);
		},
	});
};
