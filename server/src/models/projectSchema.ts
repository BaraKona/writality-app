import { Schema, model } from "mongoose";

const enum projectType {
	standard = "standard",
	collaboration = "collaboration",
}
export const enum collaboratorRole {
	owner = "owner",
	admin = "admin",
	editor = "editor",
	guest = "guest",
}

type history = {
	date: Date;
	user: string;
	action: string;
};

type folder = {
	uid: string;
	name: string;
	position?: number;
	dateCreated: Date;
	parentId?: string;
	chapters?: string[];
	folders?: folder[];
}[];
interface IProject {
	type: projectType;
	public: boolean;
	uid: string;
	owner: string;
	title: string;
	description?: string;
	board: string;
	dateCreated: {
		user: string;
		date: Date;
	};
	dateUpdated: {
		user: string;
		date: Date;
	};
	chapters?: string[];
	collaborators: {
		user: string;
		dateAdded: Date;
		role: collaboratorRole;
		active: boolean;
		lastContribution: Date;
	}[];
	pendingInvite: {
		user: string;
		dateAdded: Date;
		role: collaboratorRole;
		active: boolean;
	}[];
	guests: {
		user: string;
		dateAdded: Date;
		role: collaboratorRole;
		lastContribution: Date;
		active: boolean;
	}[];
	chatRooms: {
		uid: string;
		dateCreated: Date;
	}[];
	hasChat: boolean;
	history?: history[];
	folders: folder;
}

const projectSchema = new Schema<IProject>({
	type: { type: String, required: true, enum: ["standard", "collaboration"] },
	public: { type: Boolean, default: true },
	uid: { type: String, required: true },
	owner: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: false, default: "" },
	dateCreated: {
		user: { type: String, required: true },
		date: { type: Date, required: true },
	},
	dateUpdated: {
		user: { type: String, required: true },
		date: { type: Date, required: true },
	},
	collaborators: {
		type: [
			{
				user: { type: String, required: true, ref: "User" },
				dateAdded: { type: Date, required: true },
				lastContribution: { type: Date, required: false, default: null },
				role: {
					type: String,
					required: true,
					enum: ["owner", "admin", "editor", "guest"],
				},
				active: { type: Boolean, required: true },
			},
		],
		required: true,
	},
	pendingInvite: {
		type: [
			{
				user: { type: String, required: true, ref: "User" },
				dateAdded: { type: Date, required: true },
				lastContribution: { type: Date, required: false, default: null },
				role: {
					type: String,
					required: true,
					enum: ["owner", "admin", "editor", "guest"],
				},
				active: { type: Boolean, required: true },
			},
		],
		required: true,
	},
	guests: {
		type: [
			{
				user: { type: String, required: true, ref: "User" },
				dateAdded: { type: Date, required: true },
				lastContribution: { type: Date, required: false, default: null },
				role: {
					type: String,
					required: true,
					enum: ["owner", "admin", "editor", "guest"],
				},
				active: { type: Boolean, required: true },
			},
		],
		required: true,
	},
	hasChat: { default: false, type: Boolean, required: true },
	history: {
		type: [
			{
				date: { type: Date, required: true },
				user: { type: String, required: true, ref: "User" },
				action: { type: String, required: true },
			},
		],
		default: [],
		required: false,
	},
	board: { type: String },
	folders: {
		type: [
			{
				uid: { type: String, required: true },
				name: { type: String, required: true },
				parentId: { type: String, required: false },
				position: { type: Number, required: false },
				dateCreated: { type: Date, required: true },
				chapters: { type: [String], required: false, ref: "Chapter" },
				folders: { type: [Object], required: false, ref: "Folder" },
			},
		],
		required: true,
	},
	chapters: { type: [String], required: false, ref: "Chapter" },
});

const Project = model<IProject>("Project", projectSchema);

export default Project;
