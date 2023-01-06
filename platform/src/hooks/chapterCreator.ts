import { IChapter } from "../interfaces/IChapter";
import { v4 as uuidv4 } from "uuid";

export const chapterCreator = (userId: string, projectId: string) => {
  const id = uuidv4();
  const chapter: IChapter = {
    uid: id,
    owner: userId,
    projectId: projectId,
    type: "main",
    title: "New Chapter",
    dateCreated: {
      user: userId,
      date: new Date(),
    },
    dateUpdated: {
      user: userId,
      date: new Date(),
    },
    content: {
      uid: uuidv4(),
      type: "main",
      content: "Lets start writing...",
      dateCreated: {
        user: userId,
        date: new Date(),
      },
      dateUpdated: {
        user: userId,
        date: new Date(),
      },
      projectId: projectId,
      chapterId: id,
    },
    history: [
      {
        date: new Date(),
        user: userId,
        action: "created",
      },
    ],
  };
  return chapter;
};
