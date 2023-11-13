import Chat from "../../models/chat/chapterSchema";
import { v4 as uuidv4 } from "uuid";

export const createChat = async (req: any, res: any) => {
	const { projectId, comments } = req.body;
	const uid = uuidv4();
	const newChat = new Chat({ uid, projectId, comments });
	try {
		await newChat.save();
		res.status(201).json(newChat);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const getProjectChat = async (req: any, res: any) => {
	const { projectId } = req.params;
	try {
		const chat = await Chat.find({
			projectId,
		}).populate("comments.user", "name uid");

		res.status(200).json(chat);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const commentOnChat = async (req: any, res: any) => {
	const { projectId, chatId } = req.params;
	const userId = req.user._id;
	const { comment } = req.body;

	try {
		const chat = await Chat.findOne({
			projectId,
			uid: chatId,
		});
		chat.comments.push({
			content: comment,
			date: new Date(),
			user: userId,
			uid: uuidv4(),
		});
		chat.dateUpdated = new Date();
		await chat.save();
		console.log(chat);
		res.status(200).json(chat);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
