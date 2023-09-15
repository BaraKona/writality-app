import { useQuery } from "react-query";

import { getProjectWordCount } from "../../api/analytics/analytics";

export const useGetProjectWordCount = (projectId: string) => {
	return useQuery(["projectWordCount", projectId], () =>
		getProjectWordCount(projectId)
	);
};
