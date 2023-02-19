import CollabVersion from "../../models/collabVersionSchema";
import CollabChapter from "../../models/collabChapterSchema";
import Branch from "../../models/branchSchema";
import { v4 as uuidv4 } from "uuid";
export const createCollabChapter = async (req: any, res: any) => {
	const { title, uid, dateCreated, projectId, content, owner, history } =
		req.body;
	const newCollabChapter = new CollabChapter({
		owner,
		title,
		uid,
		dateCreated,
		dateUpdated: dateCreated,
		projectId,
		content,
		history,
	});
	try {
		await newCollabChapter.save();
		res.status(201).json(newCollabChapter);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const getCollabChapters = async (req: any, res: any) => {
	const { projectId } = req.params;
	try {
		const chapters = await CollabChapter.find({
			projectId,
		});
		res.status(200).json(chapters);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getSingleCollabChapter = async (req: any, res: any) => {
	const { projectId, chapterId } = req.params;
	try {
		const chapter = await CollabChapter.findOne({
			projectId,
			uid: chapterId,
		});
		res.status(200).json(chapter);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const deleteCollabChapters = async (req: any, res: any) => {
	const { userId, projectId, chapterId } = req.params;
	console.log(userId, projectId, chapterId);
	try {
		const chapter = await CollabChapter.findOne({
			owner: userId,
			projectId: projectId,
			uid: chapterId,
		});
		console.log(chapter);
		await CollabVersion.deleteMany({ chapterId: chapterId });
		await Branch.deleteMany({ chapterId: chapterId });
		await chapter.remove();
		res.status(200).json(chapter);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const updateCollabChapterContent = async (req: any, res: any) => {
	const { chapterId, projectId } = req.params;
	const { content, history } = req.body;
	try {
		const collabChapter = await CollabChapter.findOne({
			projectId: projectId,
			uid: chapterId,
		});
		collabChapter.content = content;
		collabChapter.history = history;
		await collabChapter.save();
		res.status(200).json(collabChapter);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const mergePositionMain = async (req: any, res: any) => {
	const { userId, projectId, chapterId } = req.params;
	const { content, history, position, dateUpdated } = req.body;
	// TODO: Fix this mess
	try {
		const chapter = await CollabChapter.findOne({
			uid: chapterId,
			projectId,
			owner: userId,
		});
		const newVersion = new CollabVersion({
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
	const { userId, chapterId, projectId } = req.params;
	const { content, history, dateUpdated } = req.body;
	try {
		const chapter = await CollabChapter.findOne({
			uid: chapterId,
			projectId,
			owner: userId,
		});
		if (chapter.owner !== userId)
			return res.status(404).json({ message: "Not authorized" });
		console.log("replace");
		chapter.content.content = content.content;
		chapter.history = history;
		chapter.dateUpdated = dateUpdated;
		chapter.content.dateUpdated = dateUpdated;
		const newVersion = new CollabVersion({
			...chapter.content,
			uid: uuidv4(),
			dateCreated: {
				user: userId,
				date: new Date(),
			},
			type: "Main",
			name: "previous main",
		});
		await newVersion.save();
		await chapter.save();
		res.status(200).json(chapter);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
