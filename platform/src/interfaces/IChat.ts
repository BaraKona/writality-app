import { IUser } from "./IUser";

export type IChat = {
	uid: string;
	projectId: string;
	owner: string;
	name: string;
	comments: {
		uid: string;
		user: IUser;
		date: Date;
		content: string;
	}[];
};
