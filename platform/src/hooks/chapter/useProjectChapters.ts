import { getProjectChapters } from "../../api/project/projects";
import { useQuery } from "react-query";

export const useProjectChapters = ({ projectId }: { projectId: string }) => {
	return useQuery(["chapters", projectId], () => getProjectChapters(projectId));
};
