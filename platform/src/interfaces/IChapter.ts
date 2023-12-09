import { IChapterContent } from "./IChapterContent";
import { IUser } from "./IUser";

export type IChapter = {
  _id: string;
  uid: string;
  owner: string;
  projectId: string;
  title: string;
  parentId?: string;
  dateCreated: {
    user: string;
    date: Date;
  };
  dateUpdated: {
    user: string;
    date: Date;
  };
  chapterNumber?: number;
  content: IChapterContent;
  type: string;
  history: {
    date: Date;
    user: IUser;
    action: string;
  }[];
};
