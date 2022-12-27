import axios from "axios";
import { IUser } from "../interfaces/IUser";
import { useToast } from "../hooks/useToast";
const userApi = axios.create({
  baseURL: "http://localhost:5000/users",
});
const registerApi = axios.create({
  baseURL: "http://localhost:5000/users/signup",
});

export const registerUser = async (user: IUser) => {
  await registerApi
    .post("/", user)
    .then((res) => {
      useToast("success", "Registration Successful");
      return res.data;
    })
    .catch((err) => {
      useToast("error", err.message);
    });
};

export const loginUser = async (user: { email: string; password: string }) => {
  return await userApi
    .post("/", user)
    .then((res) => {
      useToast("success", "Login Successful");
      return res;
    })
    .catch((err) => {
      const { data } = err.response;
      useToast("error", data.message);
    });
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
