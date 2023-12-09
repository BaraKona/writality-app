import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../useToast";
import { deleteProjectChapter } from "../../api/project/projects";
import { IChapter } from "../../interfaces/IChapter";
import { useAuthContext } from "../../contexts/AuthContext";

export const useDeleteChapter = (
  projectId: string,
  chapterId: string,
  setOpen: () => void,
) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContext();
  return useMutation(() => deleteProjectChapter(projectId, chapterId), {
    onSuccess: ({ history: newHistory, message }) => {
      queryClient.setQueryData(["project", projectId], (old: any) => {
        return {
          ...old,
          history: [
            {
              ...newHistory,
              user: {
                name: currentUser.name,
              },
            },
            ...old.history,
          ],
        };
      });
      queryClient.setQueryData(
        ["project-chapters", projectId],
        // @ts-ignore
        (old: IChapter[]) => {
          return old.filter((chapter: any) => chapter.uid !== chapterId);
        },
      );
      useToast("success", "message");
      setOpen();
    },
    onError: () => {
      useToast("error", "something went wrong, chapter not deleted 😖");
    },
  });
};
