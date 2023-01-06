export type IChat = {
  uid: string;
  projectId: string;
  owner: string;
  comments: {
    uid: string;
    user: string;
    date: Date;
    content: string;
  }[];
};
