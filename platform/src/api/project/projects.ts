import axios from "axios";
import { IProject } from "../../interfaces/IProject";
import { useToast } from "../../hooks/useToast";

const projectApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/projects",
});
const userProjectApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/projects/user",
});

export const getUserProjects = async (userId: string) => {
	console.log("userId", userId);
	try {
		const { data } = await projectApi.get(`${userId}`);
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", data.message);
	}
};

export const createProject = async (userId: string) => {
	const { data } = await projectApi.post("/", { userId });
	return data;
};

export const getAllProjects = async () => {
	const { data } = await projectApi.get("/");
	console.log("data", data);
	return data;
};

export const getSingleProject = async (userId: string, projectId: string) => {
	const { data } = await projectApi.get(`${userId}/${projectId}`);
	return data;
};

export const deleteSingleProject = async (
	userId: string,
	projectId: string
) => {
	try {
		const { data } = await projectApi.delete(`${userId}/${projectId}`);
		useToast(
			"success",
			"Project deleted successfully along with all its components 😃"
		);
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", "something went wrong, project not deleted 😖");
	}
};

export const updateProjectDescription = async (
	userId: string,
	projectId: string,
	description: string
) => {
	try {
		console.log(description);
		const { data } = await projectApi.patch(
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

export const updateProjectTitle = async (
	userId: string,
	projectId: string,
	title: string
) => {
	try {
		const { data } = await projectApi.patch(`${userId}/${projectId}/title`, {
			title,
		});
		useToast("success", "Project title updated successfully 😃");
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", "something went wrong 😖");
	}
};
