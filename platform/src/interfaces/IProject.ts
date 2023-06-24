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
export type IProject = {
	type: projectType;
	uid: string;
	owner: string;
	title: string;
	description: string;
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
};
