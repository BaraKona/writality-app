import { IChapter } from "../interfaces/IChapter";

export const useAppendHistory = (
  user: string,
  chapter: IChapter,
  name: string
) => {
  const { history: chapterHistory } = chapter;

  const newHistory = [
    ...chapterHistory,
    {
      date: new Date(),
      user,
      action: "merged",
    },
  ];

  return newHistory;
};
