import axios from "axios";
import { IProject } from "../interfaces/IProject";

const projectApi = axios.create({
  baseURL: "http://localhost:5000/projects",
});

export const getUserProjects = async (uid: string) => {
  const { data } = await projectApi.get(`/${uid}`);
  return data;
};

export const createProject = async (project: IProject) => {
  console.log(project);
  const { data } = await projectApi.post("/", project);
  return data;
};

export const getAllProjects = async () => {
  const { data } = await projectApi.get("/");
  return data;
};
