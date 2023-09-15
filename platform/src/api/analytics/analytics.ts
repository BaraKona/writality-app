import axios from "axios";

const userApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/analytics",
	withCredentials: true,
});

export const getProjectWordCount = async (projectId: string) => {
	const { data } = await userApi.get(`/project/wordCount/${projectId}`);
	return data;
};
