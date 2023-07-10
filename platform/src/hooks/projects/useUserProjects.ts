import { useQuery, useQueryClient } from "react-query";
import { getUserProjects } from "../../api/project/projects";

export const useUserProjects = () => {
	return useQuery("projects", () => {
		return getUserProjects();
	});
};
