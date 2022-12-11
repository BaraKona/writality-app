export type IChapterVersion = {
  uid: string;
  title?: string;
  name?: string;
  content: string;
  createdAt: Date;
  lastUpdated?: Date;
  projectId: string;
  chapterId: string;
  type: string;
};
