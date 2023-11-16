import axios from "axios";

const notificationApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/notifications",
	withCredentials: true,
});

export const sendProjectInvite = async (projectId: string, userId: string) => {
	const { data } = await notificationApi.post(
		`/project-invite/${projectId}/${userId}`
	);
	return data;
};

export const sendFriendRequest = async (userId: string) => {
	const { data } = await notificationApi.post(`/friend-request/${userId}`);
	return data;
};

export const revokeProjectInvite = async (
	projectId: string,
	inviteeId: string
) => {
	const { data } = await notificationApi.delete(
		`/project-invite/${projectId}/${inviteeId}`
	);
	return data;
};

export const openNotification = async (notificationId: string) => {
	const { data } = await notificationApi.patch(
		`/open-notification/${notificationId}`
	);
	return data;
};

export const acceptProjectInvitation = async (
	notificationId: string,
	projectId: string
) => {
	const { data } = await notificationApi.patch(
		`/accept-project-invitation/${notificationId}/${projectId}`
	);
	return data;
};
