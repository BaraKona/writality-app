export enum notificationType {
  projectInvite = "project-invitation",
  projectRevoke = "project-invitation-revoke",
  projectAccept = "project-invitation-accept",
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
  active?: boolean;
  ctaId?: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  token: string;
  uid: string;
  loginStreak?: number;
  loginDates?: {
    date: Date;
    wordCount: number;
  }[];
  emailVerified?: boolean;
  isOnboardingCompleted?: boolean;
  createdAt: Date;
  role?: string;
  favouriteProjects?: string[];
  dailyWordCount?: number;
  monthlyWordCount?: number;
  yearlyWordCount?: number;
  allTimeWordCount?: number;
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
  inbox: notification[];
  friends: {
    user: IUser;
    dateAdded: Date;
    chatRead?: boolean;

    chat: {
      _id: string;
      users: {
        user: IUser;
        isRead: boolean;
      }[];
    };
  }[];
}
