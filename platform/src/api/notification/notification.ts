import axios from "axios";

const userApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/notifications",
	withCredentials: true,
});

export const sendProjectInvite = async (projectId: string, userId: string) => {
	const { data } = await userApi.post(`/project-invite/${projectId}/${userId}`);
	return data;
};

export const revokeProjectInvite = async (
	projectId: string,
	inviteeId: string
) => {
	const { data } = await userApi.delete(
		`/project-invite/${projectId}/${inviteeId}`
	);
	return data;
};

export const openNotification = async (notificationId: string) => {
	const { data } = await userApi.patch(`/open-notification/${notificationId}`);
	return data;
};

export const acceptProjectInvitation = async (
	notificationId: string,
	projectId: string
) => {
	const { data } = await userApi.patch(
		`/accept-project-invitation/${notificationId}/${projectId}`
	);
	return data;
};
