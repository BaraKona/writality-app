import { IChapter } from "../interfaces/IChapter";

export const useUpdateChapter = (
  chapter: IChapter,
  text: string,
  userId: string
) => {
  const updateChapter = {
    ...chapter,
    history: [
      ...chapter.history,
      {
        date: new Date(),
        user: userId,
        action: "updated",
      },
    ],
    content: {
      ...chapter.content,
      content: text,
      dateUpdated: {
        user: userId,
        date: new Date(),
      },
    },
    dateUpdated: {
      user: userId,
      date: new Date(),
    },
  };
  console.log(updateChapter);
  return updateChapter;
};
