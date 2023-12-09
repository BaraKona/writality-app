import { useQuery, useQueryClient } from "react-query";
import { getProjectChapters } from "../../api/project/chapters";

export const useProjectChapters = (projectId: string) => {
  const queryClient = useQueryClient();

  return useQuery(
    ["project-chapters", projectId],
    () => getProjectChapters(projectId),
    {},
  );
};
