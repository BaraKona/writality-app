export const enum ProjectType {
	standard = "standard",
	collaboration = "collaboration",
}
const enum collaboratorRole {
	owner = "owner",
	admin = "admin",
	editor = "editor",
	viewer = "viewer",
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
		chapterIds?: string[];
	}[];
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
};
