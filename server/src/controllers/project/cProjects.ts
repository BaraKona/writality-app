import mongoose from "mongoose";
import Project from "../../models/projectSchema";
import Chapter from "../../models/chapterSchema";
import Branch from "../../models/branchSchema";
import Version from "../../models/versionSchema";
import { v4 as uuidv4 } from "uuid";

export const createProject = async (req: any, res: any) => {
	const { userId } = req.body;
	console.log(req.body);
	const newProject = new Project({
		type: "standard",
		uid: uuidv4(),
		owner: userId,
		title: "New Project",
		description: "New Project Description",
		dateCreated: {
			user: userId,
			date: new Date(),
		},
		dateUpdated: {
			user: userId,
			date: new Date(),
		},
		collaborators: [
			{
				uid: userId,
				dateAdded: new Date(),
				role: "owner",
				active: true,
			},
		],
	});

	try {
		await newProject.save();
		res.status(201).json(newProject);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const getUserProjects = async (req: any, res: any) => {
	const userId = req.user.uid;
	console.log(userId);
	try {
		// get projects where user is owner or collaborator and active
		const projects = await Project.find({
			$or: [
				{ owner: userId },
				{
					collaborators: {
						$elemMatch: { uid: userId, active: true },
					},
				},
			],
		});
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
	const { userId, projectId } = req.params;
	try {
		const project = await Project.findOne({ owner: userId, uid: projectId });
		res.status(200).json(project);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const deleteProject = async (req: any, res: any) => {
	const { userId, projectId } = req.params;
	try {
		const project = await Project.findOne({ owner: userId, uid: projectId });
		Promise.all([
			Version.deleteMany({ projectId }),
			Branch.deleteMany({ projectId }),
			Chapter.deleteMany({ projectId }),
		]);
		await project.remove();
		res.status(200).json({ message: "Project deleted successfully." });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const updateProjectDescription = async (req: any, res: any) => {
	const { userId, projectId } = req.params;
	const { description } = req.body;
	try {
		const project = await Project.findOne({ owner: userId, uid: projectId });
		project.description = description;
		await project.save();
		res.status(200).json(project);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const updateProjectTitle = async (req: any, res: any) => {
	const { userId, projectId } = req.params;
	const { title } = req.body;
	try {
		const project = await Project.findOne({ owner: userId, uid: projectId });
		project.title = title;
		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		await project.save();
		res.status(200).json(project);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const updateProjectType = async (req: any, res: any) => {
	const { userId, projectId } = req.params;
	const { type } = req.body;
	try {
		const project = await Project.findOne({ owner: userId, uid: projectId });
		project.type = type;
		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		await project.save();
		res.status(200).json(project);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
