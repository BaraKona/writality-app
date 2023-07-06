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
		useToast("success", "Login Successful");
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", data.message);
		return err;
	}
};

export const getUser = async (id: string) => {
	try {
		const { data } = await userApi.get(`/${id}`);
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", data.message);
	}
};

export const getAllUsers = async () => {
	try {
		const { data } = await userApi.get("/");
		return data;
	} catch (err: any) {
		const { data } = err.response;
		useToast("error", data.message);
	}
};
