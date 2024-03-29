import Project from "../../models/projectSchema";
import Chapter from "../../models/chapterSchema";
import Branch from "../../models/branchSchema";
import Version from "../../models/versionSchema";
import Chat from "../../models/chat/chatSchema";
import { createChapter, deleteSingleChapter } from "./cChapters";

import { v4 as uuidv4 } from "uuid";
import User from "../../models/user/userSchema";
import { initPusher } from "../../pusherProvider";

export const createProject = async (req: any, res: any) => {
	const userId = req.user._id;

	const newProject = new Project({
		type: "standard",
		owner: userId,
		uid: uuidv4(),
		title: "New Project",
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
				user: userId,
				dateAdded: new Date(),
				role: "owner",
				active: true,
				lastContribution: new Date(),
			},
		],
		chat: [],
		history: [
			{
				date: new Date(),
				user: userId,
				action: "created project",
			},
		],
	});

	try {
		await newProject.save();
		res.status(201).json({ project: newProject });
	} catch (error) {
		console.log(error);
		res.status(409).json({ message: error.message });
	}
};

export const getUserProjects = async (req: any, res: any) => {
	const userId = req.user._id;
	try {
		const projects = await Project.find({
			$or: [
				{ owner: userId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true },
					},
					type: "collaboration",
				},
			],
		})
			.populate({
				path: "chapters",
				select: "projectId title uid content.title content.wordCount",
			})
			.populate({
				path: "folders.chapters",
				select: "projectId title uid content.title",
			})
			.sort({ dateCreated: 1 })
			.select(
				"-chat -history -collaborators -board -hasChat -description -dateUpdated -__v"
			);

		const standard = projects.filter((project) => project.type === "standard");
		const collaboration = projects.filter(
			(project) => project.type === "collaboration"
		);

		const sortedProjects = {
			standard,
			collaboration,
		};
		res.status(200).json(sortedProjects);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getUserProfileProjects = async (req: any, res: any) => {
	const userId = req.user._id;
	try {
		const projects = await Project.find({
			$or: [
				{ owner: userId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true },
					},
					type: "collaboration",
				},
			],
		})
			.populate({
				path: "chapters",
				select: "projectId title uid content.title content.wordCount",
			})
			.populate({
				path: "folders.chapters",
				select: "projectId title uid content.title",
			})
			.sort({ dateCreated: 1 })
			.select("-chat -history -collaborators -board -hasChat -__v");
		res.status(200).json(projects);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getSingleUserProjects = async (req: any, res: any) => {
	const userId = req.params.userId;

	try {
		const { _id } = await User.findOne({ uid: userId });
		const projects = await Project.find({
			$or: [
				{ owner: _id },
				{
					collaborators: {
						$elemMatch: { user: _id, active: true },
					},
					type: "collaboration",
				},
			],
		})
			.sort({ dateCreated: 1 })
			.select("-chat -history -collaborators -board -hasChat -__v");

		res.status(200).json(projects);
	} catch (error) {
		console.log(error);
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
	const userId = req.user._id;

	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true },
					},
					uid: projectId,
					type: "collaboration",
				},
			],
		})
			.populate({
				path: "chapters",
				select: "dateUpdated projectId title uid content.title _id",
			})
			.populate({
				path: "collaborators.user",
				select: "name email uid",
			})
			.populate({
				path: "pendingInvite.user",
				select: "name email uid",
			})
			.populate({
				path: "history.user",
				select: "name uid",
			})
			.populate({
				path: "folders.chapters",
				select: "dateUpdated projectId title uid content.title _id",
			});

		project?.history.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});

		res.status(200).json(project);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const deleteProject = async (req: any, res: any) => {
	const { projectId } = req.params;
	const userId = req.user._id;
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
	const userId = req.user._id;
	const { projectId } = req.params;
	const { description } = req.body;

	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true },
					},
					uid: projectId,
					type: "collaboration",
				},
			],
		});
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

		project.collaborators.find((collaborator) => {
			if (collaborator.user === userId.toString()) {
				collaborator.lastContribution = new Date();
			}
		});

		initPusher().trigger(`project-${project.uid}`, "update", {
			projectId: project.uid,
			action: "create",
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
	const userId = req.user._id;
	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true },
					},
					uid: projectId,
					type: "collaboration",
				},
			],
		});
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

		project.collaborators.find((collaborator) => {
			if (collaborator.user === userId.toString()) {
				collaborator.lastContribution = new Date();
			}
		});

		initPusher().trigger(`project-${project.uid}`, "update", {
			projectId: project.uid,
			action: "create",
		});

		await project.save();
		res.status(200).json(project);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const updateProjectTitle = async (req: any, res: any) => {
	const { projectId } = req.params;
	const userId = req.user._id;
	const { title } = req.body;
	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true },
					},
					uid: projectId,
					type: "collaboration",
				},
			],
		});
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

		project.collaborators.find((collaborator) => {
			if (collaborator.user === userId.toString()) {
				collaborator.lastContribution = new Date();
			}
		});
		await project.save();
		res.status(200).json(project);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const updateProjectType = async (req: any, res: any) => {
	const { projectId } = req.params;
	const userId = req.user._id;
	const { type } = req.body;
	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true, role: "admin" },
					},
					uid: projectId,
					type: "collaboration",
				},
			],
		});
		project.type = type;

		if (!project.hasChat) {
			const newChat = new Chat({
				projectId,
				uid: uuidv4(),
				name: "General",
				comments: [],
				users: [userId],
				dateCreated: new Date(),
				dateUpdated: new Date(),
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

		project.collaborators.find((collaborator) => {
			if (collaborator.user === userId.toString()) {
				collaborator.lastContribution = new Date();
			}
		});

		await project.save();
		res.status(200).json({ project });
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

export const revokeProjectInvitation = async (req: any, res: any) => {
	const userId = req.user._id;
	const { projectId, inviteeId } = req.params;

	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true, role: "admin" },
					},
					uid: projectId,
				},
			],
		});
		project.pendingInvite = project.pendingInvite.filter(
			(invite) => inviteeId !== invite.user.toString()
		);
		await project.save();
		res.status(200).json({ message: "Invitation revoked successfully." });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const createFolder = async (req: any, res: any) => {
	const userId = req.user._id;
	const { projectId } = req.params;
	const { name } = req.body;

	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true },
					},
					uid: projectId,
					type: "collaboration",
				},
			],
		});
		const folder = {
			uid: uuidv4(),
			name,
			dateCreated: new Date(),
			level: 0,
		};
		project.folders.push(folder);
		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		project.history.push({
			date: new Date(),
			user: userId,
			action: "created folder",
		});
		await project.save();
		res.status(200).json(folder);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const createProjectChapter = async (req: any, res: any) => {
	const userId = req.user._id;
	const { projectId } = req.params;

	try {
		const chapter = await createChapter(userId, projectId);
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true },
					},
					uid: projectId,
					type: "collaboration",
				},
			],
		});

		const updated = {
			date: new Date(),
			user: userId,
		};

		const history = {
			date: new Date(),
			user: userId,
			action: `created a new chapter`,
		};

		project.dateUpdated = updated;
		project.history.push(history);

		project.collaborators?.find((collaborator) => {
			if (collaborator.user === userId.toString()) {
				collaborator.lastContribution = new Date();
			}
		});

		project.chapters.push(chapter._id);
		if (project.type === "collaboration") {
			initPusher().trigger(`project-${project.uid}`, "update", {
				projectId: project.uid,
				chapterId: chapter.uid,
				action: "create",
			});
		}

		await project.save();
		res.status(200).json({
			chapter
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getProjectChapters = async (req: any, res: any) => {
	const userId = req.user._id;
	const { projectId } = req.params;

	try {
		const project = await Project.findOne({ owner: userId, uid: projectId });
		const chapters = await Chapter.find({
			projectId,
			uid: { $in: project.chapters },
		});
		res.status(200).json(chapters);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const deleteProjectChapter = async (req: any, res: any) => {
	const userId = req.user._id;
	const { projectId, chapterId } = req.params;

	try {
		const chapter = await Chapter.findOne({ uid: chapterId });
		await deleteSingleChapter(userId, projectId, chapterId);
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true, role: "admin" },
					},
					uid: projectId,
					type: "collaboration",
				},
			],
		});
		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};

		const history = {
			date: new Date(),
			user: userId,
			action: `deleted chapter named ${chapter.title}`,
		};
		project.history.push(history);

		project.collaborators.find((collaborator) => {
			if (collaborator.user === userId.toString()) {
				collaborator.lastContribution = new Date();
			}
		});

		project.chapters = project.chapters.filter((id) => id !== chapterId);
		await project.save();
		res.status(200).json({ message: "Chapter deleted successfully.", history });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const moveProjectChapterIntoFolder = async (req: any, res: any) => {
	const userId = req.user._id;
	const { projectId, chapterId } = req.params;
	const { folderId } = req.body;

	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true },
					},
					uid: projectId,
					type: "collaboration",
				},
			],
		});

		if (!project) {
			res.status(404).json({ message: "Project not found." });
		}

		const chapter = await Chapter.findById(chapterId);

		if (!chapter) {
			res.status(404).json({ message: "Chapter not found." });
		}


		if (folderId !== 'root') {
			chapter.parentId = folderId;
		} else {
			chapter.parentId =	null;
		}

		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		project.history.push({
			date: new Date(),
			user: userId,
			action: `moved chapter into folder`,
		});

		project.collaborators.find((collaborator) => {
			if (collaborator.user === userId.toString()) {
				collaborator.lastContribution = new Date();
			}
		});

		await project.save();
		await chapter.save();

		res.status(200).json(folderId);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const updateFolderName = async (req: any, res: any) => {
	const userId = req.user._id;
	const { projectId, folderId } = req.params;
	const { name } = req.body;

	try {
		const project = await Project.findOne({ owner: userId, uid: projectId });
		const folder = project.folders.find((folder) => folder.uid === folderId);
		folder.name = name;
		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		project.history.push({
			date: new Date(),
			user: userId,
			action: `updated folder name`,
		});
		await project.save();
		res.status(200).json(folder);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getOpenFolderChapters = async (req: any, res: any) => {
	const userId = req.user._id;
	const { projectId, folderId } = req.params;

	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { user: userId, active: true },
					},
					uid: projectId,
					type: "collaboration",
				},
			],
		});
		const folder = project.folders.find((folder) => folder.uid === folderId);

		if (!folder || !folder.chapters) {
			return;
		}
		const chapters = await Chapter.find({
			projectId,
			uid: { $in: folder?.chapters },
		});
		res.status(200).json(chapters);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const nestFolder = async (req: any, res: any) => {
	const userId = req.user._id;
	const { projectId, folderId } = req.params;
	const { folderToNestId } = req.body;

	if (folderId === folderToNestId) {
		res.status(404).json({ message: "Folder cannot be nested within itself." });
		return;
	}

	try {
		const project = await Project.findOne({ owner: userId, uid: projectId });

		const folderToNest = project.folders.find(
			(folder) => folder.uid === folderToNestId
		);

		const folder = project.folders.find((folder) => folder.uid === folderId) || 'root'

		if (!folderToNest) {
			res.status(404).json({ message: "Folder not found." });
			return;
		}

		if (folder === 'root') {
			folderToNest.parentId = null;
		} else {
			folderToNest.parentId = folder.uid;
		}

		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		project.history.push({
			date: new Date(),
			user: userId,
			// @ts-ignore
			action: `moved folder ${folderToNest.name} into ${folder?.name || 'root'}`,
		});

		project.collaborators.find((collaborator) => {
			if (collaborator.user === userId.toString()) {
				collaborator.lastContribution = new Date();
			}
		});

		await project.save();
		res.status(200).json(folder);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
