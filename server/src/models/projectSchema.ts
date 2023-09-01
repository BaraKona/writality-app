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
	history?: {
		date: Date;
		user: string;
		action: string;
	}[];
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
				uid: { type: String, required: true },
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
				user: { type: String, required: true },
				action: { type: String, required: true },
			},
		],
		required: false,
	},
	board: { type: String },
});

const Project = model<IProject>("Project", projectSchema);

export default Project;
