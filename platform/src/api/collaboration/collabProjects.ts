import axios from "axios";
import { IProject } from "../../interfaces/IProject";
import { useToast } from "../../hooks/useToast";

const collabApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "collaborations",
});

export const getUserCollabProjects = async (userId: string) => {
	try {
		const { data } = await collabApi.get(`${userId}`);
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", data.message);
	}
};

export const createCollabProject = async (project: IProject) => {
	try {
		console.log(project);
		const { data } = await collabApi.post("/", project);
		useToast("success", " Collaborative Project created! Let's go! 😎");
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", "Something went wrong, please try again 😞");
	}
};

export const addCollaboratorToProject = async (
	userId: string,
	projectId: string,
	collaboratorId: string
) => {
	try {
		const { data } = await collabApi.put(`${userId}/${projectId}`, {
			collaboratorId,
		});
		useToast("success", " Collaborator added! 😎");
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", data.message);
	}
};

export const getSingleCollabProject = async (
	userId: string,
	projectId: string
) => {
	const { data } = await collabApi.get(`${userId}/${projectId}`);
	return data;
};

export const updateCollabDescription = async (
	userId: string,
	projectId: string,
	description: string
) => {
	try {
		const { data } = await collabApi.patch(
			`${userId}/${projectId}/description`,
			{ description }
		);
		useToast("success", "Project description updated successfully 😃");
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", "something went wrong 😖");
	}
};

export const updateCollabTitle = async (
	userId: string,
	projectId: string,
	title: string
) => {
	try {
		const { data } = await collabApi.patch(`${userId}/${projectId}/title`, {
			title,
		});
		useToast("success", "Project title updated successfully 😃");
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", "something went wrong 😖");
	}
};
