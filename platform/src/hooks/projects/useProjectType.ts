import { useMutation, useQueryClient } from "react-query";
import { ProjectType } from "../../interfaces/IProject";
import { updateProjectType } from "../../api/project/projects";

export const useProjectType = (
	userId: string,
	projectId: string,
	type: ProjectType
) => {
	const queryClient = useQueryClient();

	return useMutation(
		async () => {
			const data = await updateProjectType(userId, projectId, type);
			return data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["projects"]);
				queryClient.invalidateQueries(["project", projectId]);
				queryClient.invalidateQueries(["favourites"]);
			},
		}
	);
};
