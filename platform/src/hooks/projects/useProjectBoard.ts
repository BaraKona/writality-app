import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../useToast";
import { updateProjectBoard } from "../../api/project/projects";

export const useProjectBoard = (projectId: string) => {
	const queryClient = useQueryClient();
	return useMutation((board: string) => updateProjectBoard(projectId, board), {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["project", projectId]);
			queryClient.invalidateQueries("projects");
			useToast("success", "Project board updated successfully 😃");
		},
		onError: () => {
			useToast("error", "something went wrong 😖");
		},
	});
};
