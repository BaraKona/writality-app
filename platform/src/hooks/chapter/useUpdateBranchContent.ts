import { useMutation, useQueryClient } from "react-query";
import { updateBranch } from "../../api/project/branches";
import { useToast } from "../useToast";
import { IChapterVersion } from "../../interfaces/IChapterVersion";

export const useUpdateBranchContent = (
  chapterId: string,
  branchId: string,
  title: string,
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (content: { content: string }) =>
      updateBranch(chapterId, branchId, {
        content: content.content,
        title,
      }),
    {
      onSuccess: ({ title, dateUpdated }) => {
        // useToast("success", "Branch updated successfully 😃");
        queryClient.setQueryData(
          ["currentBranch", branchId],
          /* @ts-ignore**/
          (old: IChapterVersion) => {
            return { ...old, title, dateUpdated };
          },
        );

        queryClient.setQueryData(
          ["chapterBranches", chapterId],
          /* @ts-ignore**/
          (old?: IChapterVersion[]) => {
            if (!old) return [{ title, dateUpdated }];
            const newBranch = old.map((branch) => {
              if (branch.uid === branchId) {
                return { ...branch, title, dateUpdated };
              }
              return branch;
            });
            return newBranch;
          },
        );
      },
      onError: () => {
        useToast("error", "something went wrong 😖");
      },
    },
  );
};
