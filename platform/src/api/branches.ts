import axios from "axios";
import { IChapterVersion } from "../interfaces/IChapterVersion";
import { useToast } from "../hooks/useToast";

const branchApi = axios.create({
  baseURL: "http://localhost:5000/branches",
});

export const getAllBranches = async (chapterId: string) => {
  const { data } = await branchApi.get(`/${chapterId}`);
  return data;
};

export const getSingleBranch = async (chapterId: string, branchId: string) => {
  const { data } = await branchApi.get(`/${chapterId}/${branchId}`);
  return data;
};

export const createBranch = async (branch: IChapterVersion) => {
  try {
    const { data } = await branchApi.post("/", branch);
    useToast("success", "Branch created successfully 😃");
    return data;
  } catch (err: any) {
    console.log(err);
  }
};

export const updateBranch = async (
  chapterId: string,
  branchId: string,
  branch: IChapterVersion
) => {
  console.log("branch", branch);
  try {
    const { data } = await branchApi.patch(`/${chapterId}/${branchId}`, branch);
    useToast("success", "Branch updated successfully 😃");
    return data;
  } catch (err: any) {
    useToast("error", "Something went wrong... branch content not saved 😞");
    console.log(err);
  }
};

export const deleteBranch = async (chapterId: string, branchId: string) => {
  try {
    await branchApi.delete(`/${chapterId}/${branchId}`);
    useToast("success", "Branch deleted successfully 😃");
  } catch (err: any) {
    useToast("error", "Something went wrong... branch not deleted 😞");
    console.log(err);
  }
};
