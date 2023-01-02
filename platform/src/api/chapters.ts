import axios from "axios";
import { IChapter } from "../interfaces/IChapter";
import { useToast } from "../hooks/useToast";

const chapterApi = axios.create({
  baseURL: "http://localhost:5000/chapters",
});

export const createChapter = async (chapter: IChapter) => {
  try {
    console.log(chapter);
    const { data } = await chapterApi.post("/", chapter);
    useToast("success", "Chapter created successfully 😃");
    return data;
  } catch (err: any) {
    const { data } = err.response;
    console.log(data);
    useToast("error", "something went wrong 😖");
  }
};

export const getProjectChapters = async (userId: string, projectId: string) => {
  try {
    const { data } = await chapterApi.get(`${userId}/${projectId}`);
    return data;
  } catch (err: any) {
    console.log(err);
    useToast("error", "You have no chapters yet 😅");
    return [];
  }
};

export const getSingleChapter = async (
  userId: string,
  projectId: string,
  chapterId: string
) => {
  const { data } = await chapterApi.get(`/${userId}/${projectId}/${chapterId}`);
  return data;
};

export const updateChapterContent = async (
  userId: string,
  projectId: string,
  chapterId: string,
  chapter: IChapter
) => {
  console.log(chapter);
  try {
    const { data } = await chapterApi.put(
      `${userId}/${projectId}/${chapterId}`,
      chapter
    );
    useToast("success", "Chapter updated successfully 😃");
    return data;
  } catch (err: any) {
    console.log(err);
    useToast("error", "something went wrong 😖");
  }
};

export const deleteSingleChapter = async (
  userId: string,
  projectId: string,
  chapterId: string
) => {
  try {
    const { data } = await chapterApi.delete(
      `/${userId}/${projectId}/${chapterId}`
    );
    useToast("success", "Chapter deleted successfully 😃");
    return data;
  } catch (err: any) {
    console.log(err);
    useToast("error", "something went wrong 😖");
  }
};
