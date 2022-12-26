import axios from "axios";
import { IProject } from "../interfaces/IProject";
import { useToast } from "../hooks/useToast";

const projectApi = axios.create({
  baseURL: "http://localhost:5000/projects",
});
const userProjectApi = axios.create({
  baseURL: "http://localhost:5000/projects/user",
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

export const createProject = async (project: IProject) => {
  console.log(project);
  const { data } = await projectApi.post("/", project);
  return data;
};

export const getAllProjects = async () => {
  const { data } = await projectApi.get("/");
  console.log("data", data);
  return data;
};

export const getSingleProject = async (userId: string, projectId: string) => {
  console.log("userId", userId);
  console.log("projectId", projectId);
  const { data } = await projectApi.get(`${userId}/${projectId}`);
  return data;
};
