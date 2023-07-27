import { Schema, model } from "mongoose";

interface IUser {
	name: string;
	email: string;
	password: string;
	token: string;
	uid: string;
	createdAt: Date;
	role?: string;
	favouriteProjects?: string[];
	favouriteTabs?: string[];
	aboutMe?: string;
	profilePicture?: string;
	interests?: string[];
	roles?: string[];
	country?: string;
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
		type: [String],
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
});

const User = model<IUser>("User", userSchema);

export default User;
