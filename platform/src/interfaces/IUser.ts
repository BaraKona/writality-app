export type IUser = {
	name: string;
	email: string;
	password: string;
	token: string;
	uid: string;
	createdAt: Date;
	role?: string;
	favouriteProjects?: string[];
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
};
