import axios from "axios";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useToast } from "../../hooks/useToast";

const branchApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/collaboration-branches",
});

export const getAllCollabBranches = async (chapterId: string) => {
	const { data } = await branchApi.get(`/${chapterId}`);
	return data;
};

export const getSingleCollabBranch = async (
	chapterId: string,
	branchId: string
) => {
	try {
		const { data } = await branchApi.get(`/${chapterId}/${branchId}`);
		return data;
	} catch (err: any) {
		console.log(err);
	}
};

export const createCollabBranch = async (branch: IChapterVersion) => {
	try {
		const { data } = await branchApi.post("/", branch);
		useToast("success", "Branch created successfully 😃");
		return data;
	} catch (err: any) {
		console.log(err);
	}
};

export const updateCollabBranch = async (
	chapterId: string,
	branchId: string,
	branch: IChapterVersion
) => {
	try {
		const { data } = await branchApi.patch(`/${chapterId}/${branchId}`, branch);
		useToast("success", "Branch updated successfully 😃");
		return data;
	} catch (err: any) {
		useToast("error", "Something went wrong... branch content not saved 😞");
		console.log(err);
	}
};

export const deleteCollabBranch = async (
	chapterId: string,
	branchId: string
) => {
	try {
		await branchApi.delete(`/${chapterId}/${branchId}`);
		useToast("success", "Branch deleted successfully 😃");
	} catch (err: any) {
		useToast("error", "Something went wrong... branch not deleted 😞");
		console.log(err);
	}
};
