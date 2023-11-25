import axios from "axios";
import { useToast } from "../../hooks/useToast";

const chatApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/chats",
	withCredentials: true,
});

export const getProjectChat = async (projectId: string) => {
	try {
		const { data } = await chatApi.get(`project/${projectId}`);
		return data;
	} catch (err: any) {
		console.log(err);
	}
};

export const commentOnChat = async (
	projectId: string,
	chatId: string,
	comment: string
) => {
	if (!comment) {
		useToast("error", "Please enter a message 😞");
		return null;
	}
	try {
		const { data } = await chatApi.patch(`/comment/${chatId}`, {
			comment,
		});
		return data;
	} catch (err: any) {
		console.log(err);
	}
};

export const getUserChatById = async (chatId: string) => {
	try {
		const { data } = await chatApi.get(`user/${chatId}`);
		return data;
	} catch (err: any) {
		console.log(err);
	}
};
