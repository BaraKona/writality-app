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
	const registeredUser = await registerApi
		.post("/", user)
		.then(async (res) => {
			useToast("success", "Registration Successful");
			const { data } = res;
			loginUser({ email: data.email, password: user.password });
		})
		.catch((err) => {
			useToast("error", err.message);
			return err;
		});
	return registeredUser;
};

export const loginUser = async (user: { email: string; password: string }) => {
	try {
		const { data } = await userApi.post("/signin", user);
		return data;
	} catch (err: any) {
		return err;
	}
};

export const getUser = async () => {
	try {
		const { data } = await userApi.get(`/`);
		console.log("fired");
		console.log(data);
		return data;
	} catch (err: any) {
		const { data } = err.response;
	}
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

export const signOutUser = async () => {
	try {
		const { data } = await userApi.post("/logout");
		useToast("success", "Signed out successfully");
		return data;
	} catch (err: any) {
		useToast("error", "Something went wrong, we could not sign you out 😔");
		console.log(err.message);
	}
};
