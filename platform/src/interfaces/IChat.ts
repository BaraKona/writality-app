import { IUser } from "./IUser";

export type IChat = {
	_id: string;
	uid: string;
	projectId: string;
	owner: string;
	name: string;
	users: {
		user: IUser;
		isRead: boolean;
	}[];
	comments: {
		uid: string;
		user: IUser;
		date: Date;
		content: string;
	}[];
};
