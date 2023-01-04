import { v4 as uuidv4 } from "uuid";

import { IChapter } from "../interfaces/IChapter";

export const branchCreator = (
  chapterContent: IChapter,
  branchName: string,
  userId: string,
  text?: string
) => {
  const branch = {
    ...chapterContent.content,
    name: branchName,
    uid: uuidv4(),
    type: "branch",
    dateCreated: {
      user: userId,
      date: new Date(),
    },
    dateUpdated: {
      user: userId,
      date: new Date(),
    },
    content: text || chapterContent.content.content,
  };

  return branch;
};
