import { IChapterContent } from "./IChapterContent";

export type IChapter = {
  uid: string;
  projectID: string;
  chapterTitle: string;
  createdAt: Date;
  chapterNumber: number;
  content: IChapterContent[];
  type: string;
};
