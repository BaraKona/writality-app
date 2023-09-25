import Chapter from "../../models/chapterSchema";
import Branch from "../../models/branchSchema";
import Version from "../../models/versionSchema";
import Project from "../../models/projectSchema";
import { v4 as uuidv4 } from "uuid";

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
			title: "",
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
			owner: userId,
			projectId,
		});
		res.status(200).json(chapters);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getSingleChapter = async (req: any, res: any) => {
	const { chapterId, projectId } = req.params;
	const userId = req.user._id;

	const project = await Project.findOne({
		$or: [
			{ owner: userId },
			{
				collaborators: {
					$elemMatch: { uid: userId, active: true },
				},
				projectId,
			},
		],
	});

	if (!project) {
		res.status.res({ message: "You do not have access to this Project" });
	}

	try {
		const chapter = await Chapter.findOne({
			projectId: projectId,
			uid: chapterId,
		});
		// sort history by date
		chapter.history = chapter.history.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
		res.status(200).json(chapter);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const updateChapterContent = async (req: any, res: any) => {
	const { chapterId, projectId } = req.params;
	const { content, title, wordCount } = req.body;
	const userId = req.user._id;

	const project = await Project.findOne({
		$or: [
			{ owner: userId },
			{
				collaborators: {
					$elemMatch: { uid: userId, active: true },
				},
				projectId,
			},
		],
	});

	if (!project) {
		res.status.res({ message: "You do not have access to this Project" });
	}

	try {
		const chapter = await Chapter.findOne({
			projectId: projectId,
			uid: chapterId,
		});

		Promise.all([
			Version.create({
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
				name: chapter.title,
			}),
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
		]);

		chapter.dateUpdated = {
			user: userId,
			date: new Date(),
		};
		chapter.history.push({
			date: new Date(),
			user: userId,
			action: "updated",
		});

		await chapter.save();

		res.status(200).json(chapter);
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
			{ owner: userId },
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
	const userId = req.user.uid;
	const { content, title } = req.body;

	try {
		const chapter = await Chapter.findOne({
			uid: chapterId,
			projectId,
			owner: userId,
		});
		const newVersion = new Version({
			...chapter.content,
			uid: uuidv4(),
			dateCreated: {
				user: userId,
				date: new Date(),
			},
			type: "Main",
			name: "previous main",
			title,
		});
		chapter.content.content = content;
		chapter.content.title = title;
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
