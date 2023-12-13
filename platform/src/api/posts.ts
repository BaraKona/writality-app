import axios from "axios";
import { useToast } from "../hooks";

const postApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/posts",
  withCredentials: true,
});

export const createPost = async (post: {
  postTitle: string;
  projectTitle: string;
  description: string;
  genres: string[];
  postType: string;
  collaborationType: string;
  collaboration: string;
  theme: {
    background: string;
    postTitle: string;
    projectTitle: string;
    text: string;
    time: string;
  };
}) => {
  try {
    const res = await postApi.post("/", post);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getPosts = async (search: string) => {
  try {
    const res = await postApi.get(`/?search=${search}`);
    return res.data;
  } catch (error) {
    useToast("error", "Something went wrong, we could not get your posts 😔");
    return error;
  }
};

export const getSingleUserPosts = async (userId: string) => {
  const res = await postApi.get(`/user/public/${userId}`);
  return res.data;
};
export const getPost = async (postId: string) => {
  const res = await postApi.get(`/${postId}`);
  return res.data;
};

export const getUserPosts = async () => {
  const res = await postApi.get("/user");
  return res.data;
};

export const postComment = async (postId: string, comment: string) => {
  const res = await postApi.post(`/comment/${postId}`, { comment });
  return res.data;
};
