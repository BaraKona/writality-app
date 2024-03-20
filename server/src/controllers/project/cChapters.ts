import Chapter from "../../models/chapterSchema";
import Branch from "../../models/branchSchema";
import Version from "../../models/versionSchema";
import Project from "../../models/projectSchema";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { useDefaultDateTime } from "../../dateProvider";
import User from "../../models/user/userSchema";

export const createChapter = async (userId: string, projectId: string) => {
	const id = uuidv4();
	const newChapter = new Chapter({
		projectId,
		owner: userId,
		uid: id,
		name: "Untitled Chapter",
		title: "Untitled Chapter",
		dateCreated: {
			user: userId,
			date: new Date(),
		},
		dateUpdated: {
			user: userId,
			date: new Date(),
		},
		history: [
			{
				date: new Date(),
				user: userId,
				action: "create",
			},
		],
		content: {
			uid: uuidv4(),
			type: "main",
			content: "",
			title: "Untitled Chapter",
			dateCreated: {
				user: userId,
				date: new Date(),
			},
			dateUpdated: {
				user: userId,
				date: new Date(),
			},
			chapterId: id,
			projectId,
			history: [
				{
					date: new Date(),
					user: userId,
					action: "create",
				},
			],
			wordCount: 0,
		},
	});
	try {
		await newChapter.save();
		return newChapter;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const createVersion = async (req: any, res: any) => {
	const { projectId, chapterId } = req.params;

	try {
		const chapter = await Chapter.findOne({
			projectId,
			uid: chapterId,
		});

		const newVersion = new Version({
			title: chapter.content.title,
			owner: req.user._id,
			projectId: projectId,
			chapterId: chapterId,
			content: chapter.content.content,
			uid: uuidv4(),
			dateCreated: {
				user: req.user._id,
				date: new Date(),
			},
			type: "main",
			name: useDefaultDateTime(new Date()),
		});

		await newVersion.save();

		res.status(201).json({
			message: "Version created successfully",
			version: newVersion,
		});
		// res.status(201).json({ project: newProject });
		// return newVersion;
	} catch (error) {
		console.log(error);
		res.status(409).json({ message: error.message });
	}
};

export const getAllChapters = async (req: any, res: any) => {
	try {
		const chapters = await Chapter.find();
		res.status(200).json(chapters);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getProjectChapters = async (req: any, res: any) => {
	const { userId, projectId } = req.params;
	try {
		const chapters = await Chapter.find({
			projectId,
		}).select("name title uid dateCreated dateUpdated content.title parentId");
		res.status(200).json(chapters);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getSingleChapter = async (req: any, res: any) => {
	const { chapterId, projectId } = req.params;
	const userId = req.user._id;

	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, projectId },
				{
					collaborators: {
						$elemMatch: { uid: userId, active: true },
					},
					projectId,
					type: "collaboration",
				},
			],
		});

		if (!project) {
			res.status.res({ message: "You do not have access to this Project" });
		}
		const chapter = await Chapter.findOne({
			projectId: projectId,
			uid: chapterId,
		})
			.select("-shared.code")
			.populate("history.user", "name uid");

		chapter.history = chapter.history?.reverse();

		res.status(200).json(chapter);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const updateChapterContent = async (req: any, res: any) => {
	const { chapterId, projectId } = req.params;
	const { content, title, wordCount } = req.body;
	const userId = req.user._id;

	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, projectId },
				{
					collaborators: {
						$elemMatch: { uid: userId, active: true },
					},
					projectId,
				},
			],
		});

		const user = await User.findById(userId);

		if (!project) {
			res.status.res({ message: "You do not have access to this Project" });
		}

		if (!user) {
			res.status.res({ message: "You do not have access to this Project" });
		}

		const chapter = await Chapter.findOne({
			projectId: projectId,
			uid: chapterId,
		});

		const wordsAdded =
			wordCount > chapter.content.wordCount
				? wordCount - chapter.content.wordCount
				: 0;
		user.dailyWordCount += wordsAdded;
		user.allTimeWordCount += wordsAdded;
		user.monthlyWordCount += wordsAdded;
		user.yearlyWordCount += wordsAdded;

		// create version if words added is greater than 150

		const version =
			wordsAdded >= 150
				? Version.create({
						title: chapter.title,
						owner: userId,
						projectId: projectId,
						chapterId: chapterId,
						content: chapter.content.content,
						uid: uuidv4(),
						dateCreated: {
							user: userId,
							date: new Date(),
						},
						type: "main",
						name: useDefaultDateTime(new Date()),
				  })
				: null;

		(chapter.content = {
			...chapter.content,
			title: title,
			content: content,
			uid: uuidv4(),
			dateUpdated: {
				user: userId,
				date: new Date(),
			},
			type: "main",
			dateCreated: {
				user: chapter.content.dateCreated.user,
				date: chapter.content.dateCreated.date,
			},
			wordCount,
		}),
			(chapter.dateUpdated = {
				user: userId,
				date: new Date(),
			});
		chapter.history.push({
			date: new Date(),
			user: userId,
			action: "updated",
		});

		project.dateUpdated = {
			user: userId,
			date: new Date(),
		};

		await chapter.save();
		await project.save();
		await user.save();

		res.status(200).json({
			message: "Chapter updated successfully",
			content: chapter.content,
			history: chapter.history,
			version: version ? version : null,
			title: chapter.title,
			dateUpdated: chapter.dateUpdated,
			wordsAdded,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const deleteSingleChapter = async (
	userId: string,
	projectId: string,
	chapterId: string
) => {
	const project = await Project.findOne({
		$or: [
			{ owner: userId, projectId },
			{
				collaborators: {
					$elemMatch: { uid: userId, active: true },
				},
				projectId,
			},
		],
	});

	if (!project) {
		return;
	}

	try {
		const chapter = await Chapter.findOne({
			projectId: projectId,
			uid: chapterId,
		});
		await Version.deleteMany({ chapterId: chapterId });
		await Branch.deleteMany({ chapterId: chapterId });
		await chapter.remove();
		return chapter;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const mergePositionMain = async (req: any, res: any) => {
	const { userId, projectId, chapterId } = req.params;
	const { content, history, position, dateUpdated } = req.body;
	try {
		const chapter = await Chapter.findOne({
			uid: chapterId,
			projectId,
			owner: userId,
		});
		const newVersion = new Version({
			...chapter.content,
			uid: uuidv4(),
			dateUpdated: {
				user: userId,
				date: new Date(),
			},
			dateCreated: {
				user: userId,
				date: new Date(),
			},
			name: "previous main",
			type: "Main",
		});
		if (position === "before") {
			chapter.content.content = content.content + chapter.content.content;
		} else {
			chapter.content.content = chapter.content.content + content.content;
		}
		chapter.history = history;
		chapter.dateUpdated = dateUpdated;
		chapter.content.dateUpdated = dateUpdated;
		await newVersion.save();
		await chapter.save();
		res.status(200).json(chapter);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const mergeReplaceMain = async (req: any, res: any) => {
	const { chapterId, projectId } = req.params;
	const userId = req.user._id;
	const { branch } = req.body;

	try {
		const chapter = await Chapter.findOne({
			uid: chapterId,
			projectId,
			owner: userId,
		});

		console.log(branch);

		if (!chapter) {
			console.log("no chapter found");
			res.status(404).json({ message: "Chapter not found" });
		}

		const newVersion = new Version({
			...chapter.content,
			uid: uuidv4(),
			dateCreated: {
				user: userId,
				date: new Date(),
			},
			type: "Main",
			name: "previous main",
			title: chapter.content.title,
		});

		chapter.content.content = branch.content;

		chapter.content.title = branch.title;
		chapter.history.push({
			date: new Date(),
			user: userId,
			action: "merged",
		});
		chapter.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		chapter.content.dateUpdated = {
			user: userId,
			date: new Date(),
		};

		await newVersion.save();
		await chapter.save();
		res.status(200).json(chapter);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const updateChapterTitle = async (req: any, res: any) => {
	const { userId, chapterId, projectId } = req.params;
	const { title } = req.body;
	try {
		const chapter = await Chapter.findOne({
			uid: chapterId,
			projectId,
			owner: userId,
		});
		chapter.title = title;
		// Add to changed title to chapter history
		chapter.history.push({
			date: new Date(),
			user: userId,
			action: "title changed",
		});

		chapter.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		await chapter.save();
		res.status(200).json(chapter);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getUserChapters = async (req: any, res: any) => {
	const userId = req.user.uid;
	const { projectId } = req.params;
	const { chapterIds } = req.body;
	try {
		const chapters = await Chapter.find({
			owner: userId,
			projectId,
			uid: { $in: chapterIds },
		});

		res.status(200).json(chapters);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const createSharedChapter = async (req: any, res: any) => {
	const userId = req.user._id;
	const { projectId, chapterId } = req.params;

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

		if (!project) {
			console.log("No access to project");
			res
				.status(404)
				.json({ message: "You do not have access to share this project" });
		}

		const chapter = await Chapter.findOne({
			projectId,
			uid: chapterId,
		});

		if (!chapter) {
			console.log("no chapter found");
			res.status(404).json({ message: "Chapter not found" });
		}

		const code = uuidv4();
		const id = chapter._id;

		const token = jwt.sign({ id }, code, {
			expiresIn: "100y",
		});

		chapter.shared = {
			code,
			access: true,
			token,
		};

		await chapter.save();

		res.status(201).json({
			message: "Chapter shared successfully",
			token: chapter.shared.token,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getSharedChapter = async (req: any, res: any) => {
	const { token, chapterId } = req.params;

	try {
		const chapter = await Chapter.findOne({
			uid: chapterId,
			"shared.token": token,
		});

		if (!chapter || !chapter.shared.access) {
			console.log("no chapter found");
			res.status(404).json({ message: "Chapter not found" });
		}

		const decoded = jwt.verify(token, chapter.shared.code);

		// @ts-ignore
		if (chapter._id.toString() !== decoded.id) {
			console.log("disparity in chapter id and decoded chapter id");
			res.status(404).json({ message: "Chapter not found" });
		}

		res.status(200).json(chapter);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
