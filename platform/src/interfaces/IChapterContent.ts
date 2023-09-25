export type IChapterContent = {
	uid: string;
	title?: string;
	content: string;
	dateCreated: {
		user: string;
		date: Date;
	};
	dateUpdated: {
		user: string;
		date: Date;
	};
	projectId: string;
	chapterId: string;
	type: string;
	wordCount?: number;
};
