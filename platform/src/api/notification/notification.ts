import axios from "axios";

const userApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/notifications",
	withCredentials: true,
});

export const sendProjectInvite = async (projectId: string, userId: string) => {
	const { data } = await userApi.post(`/project-invite/${projectId}/${userId}`);
	return data;
};
