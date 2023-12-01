import { Schema, model } from "mongoose";

export enum notificationType {
	projectInvite = "project-invitation",
	projectRevoke = "project-invitation-revoke",
	projectAccept = "project-invitation-accept",
	friendRequest = "friend-request",
	friendAccept = "friend-accept",
	postComment = "post-comment",
	comment = "comment",
	reply = "reply",
	like = "like",
	dislike = "dislike",
	follow = "follow",
	message = "message",
	invite = "invite",
	request = "request",
	mention = "mention",
	tag = "tag",
	other = "other",
}

interface notification {
	notificationType: notificationType;
	notificationBody: string;
	notificationTitle: string;
	notificationTime: Date;
	notificationRead: boolean;
	active?: boolean;
	ctaId?: string;
	_id?: string;
}

export interface IUser {
	name: string;
	email: string;
	password: string;
	token: string;
	uid: string;
	loginStreak?: number;
	previousLogin?: Date;
	emailVerified?: boolean;
	isOnboardingCompleted?: boolean;
	createdAt: Date;
	role?: string;
	favouriteProjects?: string[];
	dailyWordCount?: number;
	allTimeWordCount?: number;
	bookmarks?: {
		tabType: string;
		url: string;
		name: string;
	}[];
	aboutMe?: string;
	profilePicture?: string;
	interests?: string[];
	roles?: string[];
	country?: string;
	languages?: string[];
	primaryLanguage?: string;
	isPublic: boolean;
	inbox?: notification[];
	friends?: {
		user: string;
		dateAdded: Date;
		chatRead?: boolean;
		chat?: string;
	}[];
}
const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	emailVerified: {
		type: Boolean,
		default: false,
	},
	dailyWordCount: {
		type: Number,
		default: 0,
	},
	allTimeWordCount: {
		type: Number,
		default: 0,
	},
	isOnboardingCompleted: {
		type: Boolean,
		default: false,
	},
	uid: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	previousLogin: {
		type: Date,
	},
	loginStreak: {
		type: Number,
		default: 0,
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
		enum: [
			"user",
			"admin",
			"super-admin",
			"moderator",
			"developer",
			"beta-tester",
		],
		default: "user",
	},
	favouriteProjects: {
		type: [String],
	},
	bookmarks: {
		type: [
			{
				tabType: String,
				url: String,
				name: String,
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
	friends: {
		type: [
			{
				user: {
					type: String,
					ref: "User",
				},
				dateAdded: Date,
				chatRead: {
					type: Boolean,
					default: true,
				},
				chat: {
					type: String,
					ref: "chats",
				},
			},
		],
	},
	inbox: {
		type: [
			{
				notificationType: {
					type: String,
					enum: notificationType,
				},
				notificationBody: String,
				notificationTitle: String,
				notificationTime: Date,
				notificationRead: Boolean,
				ctaId: String,
				active: Boolean,
			},
		],
	},
});

const User = model<IUser>("User", userSchema);

export default User;
