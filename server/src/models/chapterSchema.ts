import { model, Schema } from "mongoose";

interface IChapterContent {
	type: string;
	content: string;
	uid: string;
	title: string;
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
	wordCount: number;
}
interface Chapter {
	title: string;
	name: string;
	projectId: string;
	uid: string;
	owner: string;
	parentId: string;
	dateCreated: {
		user: string;
		date: Date;
	};
	dateUpdated: {
		user: string;
		date: Date;
	};
	history: {
		date: Date;
		user: string;
		action: string;
	}[];
	content: IChapterContent;
}
const chapterSchema = new Schema<Chapter>({
	owner: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: false,
	},
	parentId: {
		type: String,
		required: false,
	},
	title: {
		type: String,
		required: true,
	},
	projectId: {
		type: String,
		required: true,
	},
	uid: {
		type: String,
		required: true,
	},
	dateCreated: {
		user: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
	},
	dateUpdated: {
		user: {
			type: String,
			required: false,
			ref: "User",
		},
		date: {
			type: Date,
			required: false,
		},
	},
	history: [
		{
			date: {
				type: Date,
				required: true,
			},
			user: {
				type: String,
				required: true,
				ref: "User",
			},
			action: {
				type: String,
				required: true,
			},
		},
	],

	content: {
		type: {
			type: String,
			required: true,
		},
		title: {
			type: String,
		},
		content: {
			type: String,
		},
		uid: {
			type: String,
			required: true,
		},
		dateCreated: {
			user: {
				type: String,
				required: true,
			},
			date: {
				type: Date,
				required: true,
			},
		},
		dateUpdated: {
			user: {
				type: String,
				required: true,
				ref: "User",
			},
			date: {
				type: Date,
				required: true,
			},
		},
		projectId: {
			type: String,
			required: true,
		},
		chapterId: {
			type: String,
			required: true,
			ref: "Chapter",
		},
		wordCount: {
			type: Number,
			default: 0,
		},
	},
});

export default model<Chapter>("Chapter", chapterSchema);
