import mongoose from "mongoose";
import Project from "../models/projectSchema";

export const createProject = async (req: any, res: any) => {
  const { type, uid, owner, title, description, dateCreated } = req.body;
  const newProject = new Project({
    type,
    uid,
    owner,
    title,
    description,
    dateCreated,
  });
  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUserProjects = async (req: any, res: any) => {
  const { uid } = req.params;
  try {
    const projects = await Project.find({ owner: uid });
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllProjects = async (req: any, res: any) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProject = async (req: any, res: any) => {
  const { uid } = req.params;
  try {
    const project = await Project.findOne({ uid });
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
