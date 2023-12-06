import { useMutation, useQueryClient } from "react-query";
import { updateFolderName } from "../../api/project/projects";
import { useToast } from "../../hooks/useToast";

export const useUpdateFolderName = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ folderId, name }: { folderId: string; name: string }) =>
      updateFolderName(projectId, folderId, name),
    {
      onSuccess: (data) => {
        useToast("success", "Folder name updated successfully 😃");
        queryClient.invalidateQueries(["project", projectId]);
        return data;
      },
      onError: (err: any) => {
        useToast("error", "something went wrong, folder name not updated 😖");
        return err;
      },
    },
  );
};
