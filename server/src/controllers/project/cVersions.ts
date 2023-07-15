import Version from "../../models/versionSchema";
import { v4 as uuidv4 } from "uuid";

export const createVersion = async (req: any, res: any) => {
	const { chapterId, projectId, content } = req.body;
	const userId = req.user.uid;
	const newVersion = new Version({
		chapterId,
		projectId,
		type: "version",
		content,
		uid: uuidv4(),
		name: "Untitled Version",
		dateCreated: {
			user: userId,
			date: new Date(),
		},
	});
	try {
		await newVersion.save();
		res.status(201).json(newVersion);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const getAllChapterVersions = async (req: any, res: any) => {
	const { chapterId } = req.params;
	try {
		// find and sort by date created
		const versions = await Version.find({ chapterId }).sort({
			"dateCreated.date": -1,
		});
		// sort
		res.status(200).json(versions);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getSingleChapterVersion = async (req: any, res: any) => {
	const { chapterId, versionId } = req.params;
	try {
		const version = await Version.findOne({
			chapterId,
			uid: versionId,
		});
		res.status(200).json(version);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const deleteSingleChapterVersion = async (req: any, res: any) => {
	const { chapterId, versionId } = req.params;
	try {
		const version = await Version.findOneAndDelete({
			chapterId,
			uid: versionId,
		});
		res.status(200).json(version);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
