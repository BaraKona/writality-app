import { useMutation, useQueryClient } from "react-query";
import { createProject } from "../../api/project/projects";
import { useToast } from "../useToast";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@mantine/hooks";

export const useCreateProject = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [sidebarNav, setSidebarNav] = useLocalStorage({
		key: "sidebarNav",
	});

	return useMutation("project", async () => await createProject(), {
		onSuccess: ({ project }) => {
			useToast("success", "Project created successfully 😃");
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

			setSidebarNav("projects");
			// setTimeout(() => {
			navigate(`/project/${project.uid}/overview`);
			// }, 1500);
		},
	});
};
