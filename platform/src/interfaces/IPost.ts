export type IPost = {
  uid: string;
  owner: string;
  title: string;
  subtitle?: string;
  description: string;
  collaborationType: string;
  collaboration: string;
  genres: string[];
  postType: string;
  likes: {
    user: string;
  }[];
  dateCreated: Date;
  comments?: {
    uid: string;
    owner: string;
    content: string;
    likes: number;
    dateCreated: Date;
  }[];
};
