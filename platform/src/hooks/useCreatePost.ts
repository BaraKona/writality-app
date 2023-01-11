import { IPost } from "../interfaces/IPost";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "../hooks";
export const useCreatePost = (
  userId: string,
  postTitle: string,
  description: string,
  genres: string[],
  postType: string,
  collaborationType: string,
  collaboration: string,
  projectTitle?: string
) => {
  const post = {
    uid: uuidv4(),
    owner: userId,
    postTitle,
    projectTitle,
    description: description,
    genres: genres,
    collaboration,
    postType: postType,
    likes: [],
    dateCreated: new Date(),
    comments: [],
    collaborationType: collaborationType,
  };

  return post;
};
