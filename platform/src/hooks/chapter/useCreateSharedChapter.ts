import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../useToast";
import { createSharedChapter } from "../../api/project/chapters";
import { useNavigate } from "react-router-dom";

export const useCreateSharedChapter = (projectId: string, chapterId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(() => createSharedChapter(projectId, chapterId), {
    onSuccess: ({ token }: { token: string }) => {
      useToast("success", "Chapter shared successfully 😃");
      queryClient.setQueryData(
        ["chapter", chapterId],
        /* @ts-ignore**/
        (old: IChapterVersion) => {
          return { ...old, shared: { token, access: true } };
        },
      );
      // navigate(`/shared/${chapterId}/${data.token}`);
    },
    onError: () => {
      useToast("error", "something went wrong 😖");
    },
  });
};
