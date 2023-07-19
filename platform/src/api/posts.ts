import axios from "axios";
import { IPost } from "../interfaces/IPost";
import { useToast } from "../hooks";

const postApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/posts",
	withCredentials: true,
});

export const createPost = async (post: {
	title: string;
	description: string;
	genres: string[];
	postType: string;
	collaborationType: string;
	collaboration: string;
	projectTitle: string;
	postTitle: string;
}) => {
	try {
		const res = await postApi.post("/", post);
		return res.data;
	} catch (error) {
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

export const getPost = async (postId: string) => {
	const res = await postApi.get(`/${postId}`);
	return res.data;
};
