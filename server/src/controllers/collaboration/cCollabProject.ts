import CollabProject from "../../models/collabProjectSchema";
import Chat from "../../models/chat/chapterSchema";

// @ts-ignore
import { v4 as uuidv4 } from "uuid";

export const createCollabProject = async (req: any, res: any) => {
	const { title, uid, dateCreated, owner, description, type } = req.body;
	const newCollabProject = new CollabProject({
		owner,
		title,
		uid,
		dateCreated,
		description,
		type,
		collaborators: [
			{
				user: owner,
				dateJoined: dateCreated.date,
			},
		],
	});
	const newChat = new Chat({
		uid: uuidv4(),
		projectId: uid,
		comments: [],
	});
	console.log(newCollabProject);
	console.log(newChat);
	try {
		await newCollabProject.save();
		await newChat.save();
		res.status(201).json(newCollabProject);
	} catch (error) {
		console.log(error.message);
		console.log(error);
		res.status(409).json({ message: error.message });
	}
};

export const getAllCollabProjectsByUserId = async (req: any, res: any) => {
	const { userId } = req.params;
	try {
		const collabProjects = await CollabProject.find({
			$or: [
				{ owner: userId },
				{ collaborators: { $elemMatch: { user: userId } } },
			],
		});
		res.status(200).json(collabProjects);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getSingleCollabProject = async (req: any, res: any) => {
	const { userId, projectId } = req.params;
	try {
		const collabProject = await CollabProject.findOne({
			$or: [
				{ owner: userId },
				{ collaborators: { $elemMatch: { user: userId } } },
			],
			uid: projectId,
		});
		res.status(200).json(collabProject);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const addCollaboratorToProject = async (req: any, res: any) => {
	const { userId, projectId } = req.params;
	const { collaboratorId } = req.body;
	try {
		const collabProject = await CollabProject.findOne({
			owner: userId,
			uid: projectId,
		});
		collabProject.collaborators.push({
			user: collaboratorId,
			dateJoined: new Date(),
		});
		await collabProject.save();
		res.status(200).json(collabProject);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const updateCollabDescription = async (req: any, res: any) => {
	const { userId, projectId } = req.params;
	const { description } = req.body;
	try {
		const project = await CollabProject.findOne({
			owner: userId,
			uid: projectId,
		});
		project.description = description;
		await project.save();
		res.status(200).json(project);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const updateCollabTitle = async (req: any, res: any) => {
	const { userId, projectId } = req.params;
	const { title } = req.body;
	try {
		const project = await CollabProject.findOne({
			owner: userId,
			uid: projectId,
		});
		project.title = title;
		await project.save();
		res.status(200).json(project);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
