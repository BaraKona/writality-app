import axios from "axios";
import { IProject } from "../../interfaces/IProject";
import { useToast } from "../../hooks/useToast";

const collabApi = axios.create({
  baseURL: "http://localhost:5000/collaborations",
});

export const getUserCollabProjects = async (userId: string) => {
  try {
    const { data } = await collabApi.get(`${userId}`);
    return data;
  } catch (err: any) {
    const { data } = err.response;
    useToast("error", data.message);
  }
};

export const createCollabProject = async (project: IProject) => {
  try {
    const { data } = await collabApi.post("/", project);
    useToast("success", " Collaborative Project created! Let's go! 😎");
    return data;
  } catch (err: any) {
    const { data } = err.response;
    useToast("error", "Something went wrong, please try again 😞");
  }
};

export const addCollaboratorToProject = async (
  userId: string,
  projectId: string,
  collaboratorId: string
) => {
  try {
    const { data } = await collabApi.put(`${userId}/${projectId}`, {
      collaboratorId,
    });
    useToast("success", " Collaborator added! 😎");
    return data;
  } catch (err: any) {
    const { data } = err.response;
    useToast("error", data.message);
  }
};

export const getSingleCollabProject = async (
  userId: string,
  projectId: string
) => {
  const { data } = await collabApi.get(`${userId}/${projectId}`);
  return data;
};
