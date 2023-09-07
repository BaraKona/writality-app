import { useQuery, useQueryClient } from "react-query";
import { getSingleProject } from "../../api/project/projects";

export const useSingleProject = (projectId: string) => {
	return useQuery(["project", projectId], () => getSingleProject(projectId));
};
