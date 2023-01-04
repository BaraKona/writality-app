import { v4 as uuidv4 } from "uuid";
import { IChapter } from "../interfaces/IChapter";
import { IChapterVersion } from "../interfaces/IChapterVersion";
export const versionCreator = (
  chapterContent: IChapter,
  userId: string,
  chapterVersions: IChapterVersion[],
  text?: string
) => {
  const branch = {
    ...chapterContent.content,
    type: "version",
    name: "version " + (chapterVersions.length + 1),
    uid: uuidv4(),
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
