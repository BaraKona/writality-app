import { IChapter } from "./IChapter";
import { IUser } from "./IUser";

export const enum ProjectType {
	standard = "standard",
	collaboration = "collaboration",
}

const enum collaboratorRole {
	owner = "owner",
	admin = "admin",
	editor = "editor",
	guest = "guest",
}

export type IProject = {
	type: ProjectType;
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
	folders: {
		uid: string;
		name: string;
		position?: number;
		dateCreated: Date;
		chapters?: IChapter[];
	}[];
	collaborators: {
		user: IUser;
		dateAdded: Date;
		role: collaboratorRole;
		lastContribution: Date;
		active: boolean;
	}[];
	pendingInvite: {
		user: IUser;
		dateAdded: Date;
		role: collaboratorRole;
		lastContribution: Date;
		active: boolean;
	}[];
	guests: {
		user: IUser;
		dateAdded: Date;
		role: collaboratorRole;
		lastContribution: Date;
		active: boolean;
	}[];

	chatRooms: {
		uid: string;
		dateCreated: Date;
	}[];
	chapters: IChapter[];
	hasChat: boolean;
	history?: {
		date: Date;
		user: IUser;
		action: string;
	}[];
};
