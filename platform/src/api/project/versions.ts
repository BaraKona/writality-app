import axios from "axios";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useToast } from "../../hooks/useToast";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/versions",
	withCredentials: true,
});

export const getAllChapterVersions = async (chapterId: string) => {
	const { data } = await api.get(`/${chapterId}`);
	return data;
};

export const getSingleChapterVersion = async (
	chapterId: string,
	versionId: string
) => {
	const { data } = await api.get(`/${chapterId}/${versionId}`);
	return data;
};

export const createVersion = async (
	chapterId: string,
	projectId: string,
	content: string
) => {
	try {
		const { data } = await api.post("/", { chapterId, projectId, content });
		return data;
	} catch (err: any) {
		console.log(err);
	}
};

export const deleteSingleChapterVersion = async (
	chapterId: string,
	versionId: string
) => {
	try {
		const { data } = await api.delete(`/${chapterId}/${versionId}`);
		useToast("success", "Version deleted successfully 😃");
		return data;
	} catch (err: any) {
		useToast("error", "something went wrong, version not deleted 😖");
		console.log(err);
	}
};
