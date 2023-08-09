import { Schema, model } from "mongoose";

export interface IUser {
	name: string;
	email: string;
	password: string;
	token: string;
	uid: string;
	createdAt: Date;
	role?: string;
	favouriteProjects?: string[];
	favouriteTabs?: {
		tabType: string;
		url: string;
	}[];
	aboutMe?: string;
	profilePicture?: string;
	interests?: string[];
	roles?: string[];
	country?: string;
	languages?: string[];
	primaryLanguage?: string;
	isPublic: boolean;
}
const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	uid: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
	},
	createdAt: {
		type: Date,
		required: true,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	favouriteProjects: {
		type: [String],
	},
	favouriteTabs: {
		type: [
			{
				tabType: String,
				url: String,
			},
		],
	},
	aboutMe: {
		type: String,
	},
	profilePicture: {
		type: String,
	},
	interests: {
		type: [String],
	},
	roles: {
		type: [String],
	},
	country: {
		type: String,
	},
	languages: {
		type: [String],
	},
	primaryLanguage: {
		type: String,
	},
	isPublic: {
		type: Boolean,
		default: true,
		required: true,
	},
});

const User = model<IUser>("User", userSchema);

export default User;
