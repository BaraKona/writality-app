import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../useToast";
import { createProjectChapter } from "../../api/project/projects";

export const useCreateChapter = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => createProjectChapter(projectId), {
    onSuccess: ({ chapter }) => {
      queryClient.setQueryData(["project-chapters", projectId], (old?: any) => {
        if (!old) return [chapter];
        return [...old, chapter];
      });
      useToast("success", "Chapter created successfully 😃");
    },
    onError: () => {
      useToast("error", "something went wrong, chapter not created 😖");
    },
  });
};
