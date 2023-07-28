export type IUser = {
	name: string;
	email: string;
	password: string;
	token: string;
	uid: string;
	createdAt: Date;
	role?: string;
	favouriteProjects?: string[];
	favouriteTabs?: string[];
	aboutMe?: string;
	profilePicture?: string;
	interests?: string[];
	roles?: string[];
	country?: string;
	languages?: string[];
	primaryLanguage?: string;
};
