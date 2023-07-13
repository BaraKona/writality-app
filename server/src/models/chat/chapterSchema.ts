import { Schema, model } from "mongoose";

interface IChat {
	uid: string;
	projectId: string;
	name: string;
	comments: {
		uid: string;
		user: string;
		date: Date;
		content: string;
	}[];
	dateCreated: Date;
	dateUpdated: Date;
}

const chatSchema = new Schema<IChat>({
	name: {
		type: String,
		required: true,
	},
	uid: {
		type: String,
		required: true,
	},
	projectId: {
		type: String,
		required: true,
	},
	comments: [
		{
			uid: {
				type: String,
				required: true,
			},
			user: {
				type: String,
				required: true,
			},
			date: {
				type: Date,
				required: true,
			},
			content: {
				type: String,
				required: true,
			},
		},
	],
});

export default model<IChat>("chats", chatSchema);
