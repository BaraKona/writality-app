import { useQuery, useQueryClient } from "react-query";
import { getSingleProject } from "../../api/project/projects";
import { useSocket } from "../../Providers/SocketProvider";

export const useSingleProject = (projectId: string) => {
	const queryClient = useQueryClient();
	return useQuery(["project", projectId], () => getSingleProject(projectId), {
		onSuccess: (data) => {},
	});
};
