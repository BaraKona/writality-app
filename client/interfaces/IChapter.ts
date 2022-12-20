import { IChapterContent } from "./IChapterContent";

export type IChapter = {
  uid: string;
  owner: string;
  projectId: string;
  title: string;
  dateCreated: {
    user: string;
    date: Date;
  };
  chapterNumber?: number;
  content?: IChapterContent[];
  type: string;
};
