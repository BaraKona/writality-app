import { Schema, model } from "mongoose";

const enum projectType {
	standard = "standard",
	collaboration = "collaboration",
}
const enum collaboratorRole {
	owner = "owner",
	admin = "admin",
	editor = "editor",
	viewer = "viewer",
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
	chapters?: string[];
	folders?: folder[];
}[];
interface IProject {
	type: projectType;
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
		uid: string;
		dateAdded: Date;
		role: collaboratorRole;
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
	uid: { type: String, required: true },
	owner: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: false },
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
				uid: { type: String, required: true, ref: "User" },
				dateAdded: { type: Date, required: true },
				role: {
					type: String,
					required: true,
					enum: ["owner", "admin", "editor", "viewer"],
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
		required: false,
	},
	board: { type: String },
	folders: {
		type: [
			{
				uid: { type: String, required: true },
				name: { type: String, required: true },
				position: { type: Number, required: false },
				dateCreated: { type: Date, required: true },
				chapters: { type: [String], required: false, ref: "Chapter" },
				folders: { type: [Object], required: false },
			},
		],
		required: true,
	},
	chapters: { type: [String], required: false, ref: "Chapter" },
});

const Project = model<IProject>("Project", projectSchema);

export default Project;
