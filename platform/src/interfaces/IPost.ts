import { IUser } from "./IUser";

export type IPost = {
	uid: string;
	owner: IUser;
	postTitle: string;
	projectTitle: string;
	description: string;
	collaborationType: string;
	collaboration: string;
	genres: string[];
	postType: string;
	likes: {
		user: string;
	}[];
	dateCreated: Date;
	dateUpdated: Date;
	comments: {
		uid: string;
		owner: IUser;
		content: string;
		likes: number;
		dateCreated: Date;
	}[];
	theme: {
		background: string;
		postTitle: string;
		projectTitle: string;
		text: string;
		time: string;
	};
};
