import axios from "axios";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useToast } from "../../hooks/useToast";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/collaboration-versions",
});

export const getAllCollabChapterVersions = async (chapterId: string) => {
	const { data } = await api.get(`/${chapterId}`);
	return data;
};

export const getSingleCollabChapterVersion = async (
	chapterId: string,
	versionId: string
) => {
	const { data } = await api.get(`/${chapterId}/${versionId}`);
	return data;
};

export const createCollabVersion = async (version: IChapterVersion) => {
	try {
		const { data } = await api.post("/", version);
		useToast("success", "Version created successfully 😃");
		return data;
	} catch (err: any) {
		useToast("error", "something went wrong, version not created 😖");
		console.log(err);
	}
};

export const deleteSingleCollabChapterVersion = async (
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
