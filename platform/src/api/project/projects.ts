import axios from "axios";
import { useToast } from "../../hooks/useToast";

const projectApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/projects",
	withCredentials: true,
});
const userProjectApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/projects/user",
	withCredentials: true,
});

export const getUserProjects = async () => {
	const { data } = await userProjectApi.get("/");
	return data;
};

export const getUserProfileProjects = async () => {
	const { data } = await projectApi.get(`/profile`);
	return data;
};

export const createProject = async () => {
	const { data } = await projectApi.post("/");
	return data;
};

export const getAllProjects = async () => {
	const { data } = await projectApi.get("/");
	console.log("data", data);
	return data;
};

export const getSingleProject = async (projectId: string) => {
	const { data } = await projectApi.get(`/user/${projectId}`);
	return data;
};

export const deleteSingleProject = async (projectId: string) => {
	try {
		const { data } = await projectApi.delete(`/project/user/${projectId}`);
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

export const getSingleUserProjects = async (userId: string) => {
	const { data } = await projectApi.get(`/public/${userId}`);
	return data;
};

export const updateProjectDescription = async (
	userId: string,
	projectId: string,
	description: string
) => {
	try {
		const { data } = await projectApi.patch(`/user/${projectId}/description`, {
			description,
		});
		useToast("success", "Project description updated successfully 😃");
		return data;
	} catch (err: any) {
		console.log(err);
		useToast("error", "something went wrong 😖");
	}
};
export const updateProjectBoard = async (projectId: string, board: string) => {
	const { data } = await projectApi.patch(`user/${projectId}/board`, {
		board,
	});
	return data;
};

export const updateProjectTitle = async (projectId: string, title: string) => {
	const { data } = await projectApi.patch(`user/${projectId}/title`, {
		title,
	});
	return data;
};

export const updateProjectType = async (projectId: string, type: string) => {
	const { data } = await projectApi.patch(`user/${projectId}/type`, {
		type,
	});

	return data;
};

export const getUserFavourites = async () => {
	try {
		const { data } = await projectApi.get("/favourites");
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", "something went wrong 😖");
	}
};

export const createFolder = async (projectId: string, name: string) => {
	const { data } = await projectApi.post(`/folder/${projectId}`, {
		name,
	});
	return data;
};

export const createProjectChapter = async (projectId: string) => {
	const { data } = await projectApi.post(`/chapter/${projectId}`);
	return data;
};

export const deleteProjectChapter = async (
	projectId: string,
	chapterId: string
) => {
	const { data } = await projectApi.delete(
		`/chapter/${projectId}/${chapterId}`
	);
	return data;
};

export const getProjectChapters = async (projectId: string) => {
	const { data } = await projectApi.get(`/chapters/${projectId}`);
	return data;
};

export const moveProjectChapterIntoFolder = async (
	projectId: string,
	chapterId: string,
	folderId: string
) => {
	const { data } = await projectApi.patch(
		`/chapter/move-to-folder/${projectId}/${chapterId}`,
		{ folderId }
	);
	return data;
};

export const getOpenFolderChapters = async (
	projectId: string,
	folderId: string
) => {
	const { data } = await projectApi.get(
		`/open-folder/${projectId}/${folderId}`
	);

	return data;
};

export const nestFolder = async (
	projectId: string,
	folderId: string,
	parentFolderId: string
) => {
	const { data } = await projectApi.patch(
		`/folder/nest/${projectId}/${parentFolderId}`,
		{ folderToNestId: folderId }
	);
	return data;
};
