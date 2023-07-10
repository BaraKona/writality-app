import { useMutation, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { createProject } from "../../api/project/projects";
import axios from "axios";
import { useToast } from "../useToast";

export const useCreateProject = () => {
	const queryClient = useQueryClient();

	return useMutation(
		"project",
		async () => {
			const data = await createProject();
			return data;
		},
		{
			onSuccess: (data) => {
				useToast("success", "Project created successfully 😃");
				queryClient.invalidateQueries(["projects"]);
			},
		}
	);
};
