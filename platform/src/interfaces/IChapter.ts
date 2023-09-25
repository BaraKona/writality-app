import { IChapterContent } from "./IChapterContent";

export type IChapter = {
	_id?: string;
	uid: string;
	owner: string;
	projectId: string;
	title: string;
	dateCreated: {
		user: string;
		date: Date;
	};
	dateUpdated: {
		user: string;
		date: Date;
	};
	chapterNumber?: number;
	content: IChapterContent;
	type: string;
	history: {
		date: Date;
		user: string;
		action: string;
	}[];
};
