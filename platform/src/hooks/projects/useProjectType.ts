import { useMutation, useQueryClient } from "react-query";
import { ProjectType } from "../../interfaces/IProject";
import { updateProjectType } from "../../api/project/projects";
import { useToast } from "../useToast";
import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
export const useProjectType = (projectId: string, type: ProjectType) => {
	const queryClient = useQueryClient();
	const [sidebarNav, setSidebarNav] = useLocalStorage({
		key: "sidebarNav",
	});
	const navigate = useNavigate();

	return useMutation(
		async () => {
			const data = await updateProjectType(projectId, type);
			return data;
		},
		{
			onSuccess: ({ project }) => {
				queryClient.invalidateQueries(["project", projectId]);
				queryClient.setQueryData(["projects"], (old: any) => {
					if (project.type === "standard") {
						return {
							...old,
							standard: [...old.standard, project],
						};
					} else {
						return {
							...old,
							collaboration: [...old.collaboration, project],
						};
					}
				});
				useToast("success", "Project type updated successfully 😃");

				setSidebarNav("collaborations");
				navigate(`/project/${project.uid}/overview`);
			},
			onError: () => {
				useToast("error", "Something went wrong 😖");
			},
		}
	);
};
