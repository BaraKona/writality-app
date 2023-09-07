import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../useToast";
import { createFolder } from "../../api/project/projects";

export const useCreateFolder = (projectId: string) => {
	const queryClient = useQueryClient();
	return useMutation((name: string) => createFolder(projectId, name), {
		onSuccess: () => {
			useToast("success", "Folder created successfully 😃");
			queryClient.invalidateQueries(["folders", projectId]);
			queryClient.invalidateQueries(["project", projectId]);
			queryClient.invalidateQueries(["projects"]);
		},
		onError: () => {
			useToast("error", "something went wrong 😖");
		},
	});
};
