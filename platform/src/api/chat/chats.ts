import axios from "axios";
import { IChat } from "../../interfaces/IChat";
import { useToast } from "../../hooks/useToast";
import { v4 as uuidv4 } from "uuid";

const chatApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/chats",
});

export const getProjectChat = async (projectId: string) => {
	try {
		const { data } = await chatApi.get(`/${projectId}`);
		return data;
	} catch (err: any) {
		console.log(err);
	}
};

export const commentOnChat = async (
	projectId: string,
	comment: { user: string; content: string; date: Date; uid: string }
) => {
	if (!comment.content) {
		useToast("error", "Please enter a comment 😞");
		return null;
	}
	try {
		const { data } = await chatApi.post(`/${projectId}`, comment);
		useToast("success", " Comment added! 😎");
		return data;
	} catch (err: any) {
		console.log(err);
	}
};
