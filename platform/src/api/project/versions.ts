import axios from "axios";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useToast } from "../../hooks/useToast";

const api = axios.create({
  baseURL: "http://localhost:5000/versions",
});

export const getAllChapterVersions = async (chapterId: string) => {
  const { data } = await api.get(`/${chapterId}`);
  return data;
};

export const getSingleChapterVersion = async (
  chapterId: string,
  versionId: string
) => {
  const { data } = await api.get(`/${chapterId}/${versionId}`);
  return data;
};

export const createVersion = async (version: IChapterVersion) => {
  try {
    const { data } = await api.post("/", version);
    useToast("success", "Version created successfully 😃");
    return data;
  } catch (err: any) {
    useToast("error", "something went wrong, version not created 😖");
    console.log(err);
  }
};

export const deleteSingleChapterVersion = async (
  chapterId: string,
  versionId: string
) => {
  try {
    const { data } = await api.delete(`/${chapterId}/${versionId}`);
    useToast("success", "Version deleted successfully 😃");
    return data;
  } catch (err: any) {
    useToast("error", "something went wrong, version not deleted 😖");
    console.log(err);
  }
};
