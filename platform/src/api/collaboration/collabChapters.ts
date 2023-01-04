import axios from "axios";
import { IProject } from "../../interfaces/IProject";
import { useToast } from "../../hooks/useToast";
import { IChapter } from "../../interfaces/IChapter";

const collabApi = axios.create({
  baseURL: "http://localhost:5000/collaboration-chapters",
});

export const createCollabChapter = async (chapter: IChapter) => {
  try {
    const { data } = await collabApi.post("/", chapter);
    useToast("success", "Chapter created successfully 😃");
    return data;
  } catch (err: any) {
    const { data } = err.response;
    console.log(data);
    useToast("error", "something went wrong 😖");
  }
};

export const getCollabChapters = async (projectId: string) => {
  try {
    const { data } = await collabApi.get(`${projectId}`);
    return data;
  } catch (err: any) {
    console.log(err);
    useToast("error", "You have no chapters yet 😅");
    return [];
  }
};

export const getSingleCollabChapter = async (
  projectId: string,
  chapterId: string
) => {
  const { data } = await collabApi.get(`/${projectId}/${chapterId}`);
  return data;
};

export const deleteCollabChapter = async (
  userId: string,
  projectId: string,
  chapterId: string
) => {
  console.log(userId, projectId, chapterId);
  try {
    const { data } = await collabApi.delete(
      `${userId}/${projectId}/${chapterId}`
    );
    useToast("success", "Chapter deleted successfully 😃");
    return data;
  } catch (err: any) {
    console.log(err);
    useToast("error", "something went wrong 😖");
  }
};
