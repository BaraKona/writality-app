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
		isRead?: boolean;
	}[];
	users: {
		user: string;
		isRead: boolean;
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
		required: false,
	},
	dateCreated: {
		type: Date,
		required: true,
	},
	dateUpdated: {
		type: Date,
		required: true,
	},
	users: [
		{
			user: {
				type: String,
				ref: "User",
			},
			isRead: {
				type: Boolean,
				default: true,
			},
		},
	],
	comments: [
		{
			uid: {
				type: String,
				required: true,
			},
			user: {
				type: String,
				ref: "User",
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
			isRead: {
				type: Boolean,
				required: false,
			},
		},
	],
});

export default model<IChat>("chats", chatSchema);
