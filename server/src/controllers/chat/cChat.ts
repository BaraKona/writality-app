import Chat from "../../models/chat/chatSchema";
import { v4 as uuidv4 } from "uuid";
import { pusher } from "../../../index";

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
export const getUserChatById = async (req: any, res: any) => {
	const { chatId } = req.params;
	const userId = req.user._id;
	try {
		const chat = await Chat.findById(chatId).populate(
			"comments.user",
			"name uid"
		);

		chat.users.find(
			(user) => user.user.toString() === userId.toString()
		).isRead = true;
		chat.save();
		// console.log(chat.users);
		res.status(200).json(chat);
	} catch (error) {
		res.status(404).json({ message: error.message });
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
	const { chatId } = req.params;
	const userId = req.user._id;
	const { comment } = req.body;

	try {
		const chat = await Chat.findById(chatId);
		chat.comments.push({
			content: comment,
			date: new Date(),
			user: userId,
			uid: uuidv4(),
			isRead: false,
		});
		chat.dateUpdated = new Date();

		const recipient = chat.users.find(
			(user) => user.user.toString() !== userId.toString()
		);

		recipient.isRead = false;
		pusher.triggerBatch([
			{
				channel: `chat-${chatId}`,
				name: "userChat",
				data: { comment, userId },
			},
			{ channel: `user-${recipient.user}`, name: "friend-update", data: {} },
		]);

		await chat.save();
		res.status(200).json(chat);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
