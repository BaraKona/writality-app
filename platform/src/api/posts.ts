import axios from "axios";
import { IPost } from "../interfaces/IPost";
import { useToast } from "../hooks";

const postApi = axios.create({
  baseURL: "http://localhost:5000/posts",
});

export const createPost = async (post: IPost) => {
  try {
    const res = await postApi.post("/", post);
    useToast("success", "Post created 😁");
    return res.data;
  } catch (error) {
    useToast("error", "Something went wrong, we could not create your post 😔");
    return error;
  }
};

export const getPosts = async () => {
  try {
    const res = await postApi.get("/");
    return res.data;
  } catch (error) {
    useToast("error", "Something went wrong, we could not get your posts 😔");
    return error;
  }
};
