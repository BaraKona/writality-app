import { useQuery, useQueryClient } from "react-query";
import { getUserProfileProjects } from "../../api/project/projects";
import { useToast } from "../useToast";

export const useUserProfileProjects = () => {
	return useQuery(["projects", "profile"], getUserProfileProjects, {
		onError: () => {
			useToast("error", "Something went wrong... 😞");
		},
	});
};
