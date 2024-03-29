import axios from "axios";
import { useToast } from "../../hooks/useToast";
import { IChapterVersion } from "../../interfaces/IChapterVersion";

const chapterApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/chapters",
  withCredentials: true,
});

export const createChapter = async (projectId: string) => {
  const { data } = await chapterApi.post("/", { projectId });
  return data;
};

export const getProjectChapters = async (projectId: string) => {
  const { data } = await chapterApi.get(`/chapters/${projectId}`);

  return data;
};

export const getSingleChapter = async (projectId: string, chapterId: string) => {
  const { data } = await chapterApi.get(`/single/${projectId}/${chapterId}`);
  return data;
};

export const updateChapterContent = async ({
  projectId,
  chapterId,
  content,
  title,
  wordCount,
}: {
  projectId: string;
  chapterId: string;
  content: string;
  title: string;
  wordCount: number;
}) => {
  const { data } = await chapterApi.patch(`content/${projectId}/${chapterId}`, {
    content,
    title,
    wordCount,
  });
  return data;
};

export const deleteSingleChapter = async (userId: string, projectId: string, chapterId: string) => {
  try {
    const { data } = await chapterApi.delete(`/${userId}/${projectId}/${chapterId}`);
    useToast("success", "Chapter deleted successfully 😃");
    return data;
  } catch (err: any) {
    console.log(err);
    useToast("error", "something went wrong 😖");
  }
};

export const mergePositionMain = async (
  userId: string,
  projectId: string,
  chapterId: string,
  position: string,
  content: IChapterVersion,
  history: {
    date: Date;
    user: string;
    action: string;
  }[],
  dateUpdated: {
    user: string;
    date: number;
  },
) => {
  try {
    const { data } = await chapterApi.patch(`/merge/position/${userId}/${projectId}/${chapterId}`, {
      position,
      content,
      history,
      dateUpdated,
    });
    useToast("success", "Chapter merged successfully 😃");
    return data;
  } catch (err: any) {
    console.log(err);
    useToast("error", "something went wrong 😖");
  }
};

export const mergeReplaceMain = async (
  projectId: string,
  chapterId: string,
  branch: IChapterVersion,
) => {
  console.log({ branch });
  const { data } = await chapterApi.patch(`/merge/replace/${projectId}/${chapterId}`, { branch });
  return data;
};

export const updateChapterTitle = async (
  userId: string,
  projectId: string,
  chapterId: string,
  title: string,
) => {
  try {
    const { data } = await chapterApi.put(`/title/${userId}/${projectId}/${chapterId}`, { title });
    useToast("success", "Chapter title updated successfully 😃");
    return data;
  } catch (err: any) {
    console.log(err);
    useToast("error", "something went wrong 😖");
  }
};

export const createVersion = async (projectId: string, chapterId: string) => {
  return await chapterApi.post(`/version/create/${projectId}/${chapterId}`);
};

export const createSharedChapter = async (projectId: string, chapterId: string) => {
  const { data } = await chapterApi.patch(`/shared/${projectId}/${chapterId}`);
  return data;
};

export const getSharedChapter = async (chapterId: string, token: string) => {
  const { data } = await chapterApi.get(`/shared/${chapterId}/${token}`);
  return data;
};
