import mongoose from "mongoose";
import Project from "../../models/projectSchema";
import Chapter from "../../models/chapterSchema";
import Branch from "../../models/branchSchema";
import Version from "../../models/versionSchema";
import Chat from "../../models/chat/chapterSchema";
import { v4 as uuidv4 } from "uuid";
import User from "../../models/user/userSchema";
import { Request, Response } from "express";

export const createProject = async (req: any, res: any) => {
	const userId = req.user.uid;

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
		chat: [],
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
		}).sort({ dateUpdated: -1 });
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
	const { projectId } = req.params;
	const userId = req.user.uid;
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
		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		project.history.push({
			date: new Date(),
			user: userId,
			action: "updated description",
		});
		await project.save();
		res.status(200).json(project);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const updateProjectBoard = async (req: any, res: any) => {
	const { projectId } = req.params;
	const { board } = req.body;
	const userId = req.user.uid;
	try {
		const project = await Project.findOne({ owner: userId, uid: projectId });
		project.board = board;
		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		project.history.push({
			date: new Date(),
			user: userId,
			action: "updated board",
		});
		await project.save();
		res.status(200).json(project);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const updateProjectTitle = async (req: any, res: any) => {
	const { projectId } = req.params;
	const userId = req.user.uid;
	const { title } = req.body;
	try {
		const project = await Project.findOne({ owner: userId, uid: projectId });
		project.title = title;
		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};

		project.history.push({
			date: new Date(),
			user: userId,
			action: "updated title",
		});

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

		if (!project.hasChat) {
			const newChat = new Chat({
				projectId,
				uid: uuidv4(),
				name: "General",
				comments: [],
				dateCreated: {
					user: userId,
					date: new Date(),
				},
				dateUpdated: {
					user: userId,
					date: new Date(),
				},
			});

			await newChat.save();
			project.hasChat = true;
		}

		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		project.history.push({
			date: new Date(),
			user: userId,
			action: "updated type",
		});

		await project.save();
		res.status(200).json(project);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getUserFavourites = async (req: any, res: any) => {
	const userId = req.user.uid;

	try {
		const user = await User.findOne({ uid: userId });
		const projectIds = user.favouriteProjects;
		const projects = await Project.find({
			$or: [
				{ owner: userId },
				{
					collaborators: {
						$elemMatch: { uid: userId, active: true },
					},
				},
			],
			uid: { $in: projectIds },
		});

		res.status(200).json(projects);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
