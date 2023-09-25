import { useQuery, useQueryClient } from "react-query";
import { getUserProjects } from "../../api/project/projects";
import { useToast } from "../useToast";

export const useUserProjects = () => {
	return useQuery("projects", getUserProjects, {
		onError: () => {
			useToast("error", "Something went wrong... 😞");
		},
	});
};
