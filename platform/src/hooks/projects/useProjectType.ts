import { useMutation, useQueryClient } from "react-query";
import { ProjectType } from "../../interfaces/IProject";
import { updateProjectType } from "../../api/project/projects";
import { useToast } from "../useToast";
export const useProjectType = (projectId: string, type: ProjectType) => {
	const queryClient = useQueryClient();

	return useMutation(
		async () => {
			const data = await updateProjectType(projectId, type);
			return data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["projects"]);
				queryClient.invalidateQueries(["project", projectId]);
				queryClient.invalidateQueries(["favourites"]);
				useToast("success", "Project type updated successfully 😃");
			},
			onError: () => {
				useToast("error", "Something went wrong 😖");
			},
		}
	);
};
