import { useQuery } from "react-query";
import { getSharedChapter } from "../../api/project/chapters";

export const useSharedChapter = (chapterId: string, token: string) => {
  return useQuery(["shared-chapter", token], () => getSharedChapter(chapterId, token));
};
