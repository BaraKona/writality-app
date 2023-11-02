import { useQuery } from "react-query";
import { getSingleUserProjects } from "../../api/project/projects";

export const useSingleUserProjects = (userId: string) => {
	const { data, isLoading, error } = useQuery(
		["single-user-projects", userId],
		() => getSingleUserProjects(userId)
	);
	return { data, isLoading, error };
};
