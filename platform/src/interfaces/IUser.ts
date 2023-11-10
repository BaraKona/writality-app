export enum notificationType {
	projectInvite = "project-invitation",
	comment = "comment",
	reply = "reply",
	like = "like",
	dislike = "dislike",
	follow = "follow",
	message = "message",
	invite = "invite",
	request = "request",
	mention = "mention",
	tag = "tag",
	other = "other",
}

interface notification {
	notificationType: notificationType;
	notificationBody: string;
	notificationTitle: string;
	notificationTime: Date;
	notificationRead: boolean;
	ctaId?: string;
}

export type IUser = {
	_id: string;
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
	inbox?: notification[];
};
