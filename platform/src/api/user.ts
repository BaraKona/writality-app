import axios from "axios";
import { IUser } from "../interfaces/IUser";
import { useToast } from "../hooks/useToast";
const userApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/users",
	withCredentials: true,
});
const registerApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + "/users/signup",
	withCredentials: true,
});

export const registerUser = async (user: {
	name: string;
	email: string;
	password: string;
}) => {
	const registeredUser = await registerApi.post("/", user).catch((err) => {
		useToast("error", err.message);
		return err;
	});
	return registeredUser;
};

export const loginUser = async (user: { email: string; password: string }) => {
	const { data } = await userApi.post("/signin", user);
	return data;
};

export const getUser = async () => {
	const { data } = await userApi.get(`/`);
	return data;
};

export const getAllUsers = async () => {
	try {
		const { data } = await userApi.get("/all");
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", data.message);
	}
};

export const getSingleUser = async (userId: string) => {
	const { data } = await userApi.get(`/user/${userId}`);
	return data;
};

export const signOutUser = async () => {
	const { data } = await userApi.post("/logout");
	return data;
};

export const addFavouriteProject = async (projectId: string) => {
	try {
		const { data } = await userApi.post("/favourites", { projectId });
		return data;
	} catch (err: any) {
		const { data } = err.response;
	}
};

export const removeFavouriteProject = async (projectId: string) => {
	try {
		const { data } = await userApi.delete("/favourites", {
			data: { projectId },
		});
		return data;
	} catch (err: any) {
		const { data } = err.response;
	}
};

export const updateUserData = async (user: IUser) => {
	const { data } = await userApi.patch("/", user);
	return data;
};

export const addbookmarks = async ({
	type,
	url,
	name,
}: {
	type: string;
	url: string;
	name: string;
}) => {
	const { data } = await userApi.post("/favourites/tabs", { type, url, name });
	return data;
};

export const sendVerificationEmail = async () => {
	const { data } = await userApi.post("/email/send-verification");
	return data;
};

export const verifyUser = async (token: string) => {
	const { data } = await userApi.post("/email/verify", { token });
	return data;
};

export const completeOnboarding = async (user: IUser) => {
	const { data } = await userApi.post("/onboarding", { ...user });
	return data;
};

export const removeBookmark = async (url: string) => {
	const { data } = await userApi.patch("/bookmarks", {
		url,
	});
	return data;
};
