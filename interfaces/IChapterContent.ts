export type IChapterContent = {
  uid: string;
  title?: string;
  content: string;
  createdAt: Date;
  lastUpdated?: Date;
  projectId: string;
  chapterId: string;
  type: string;
};
