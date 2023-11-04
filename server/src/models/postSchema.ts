import { Schema, model } from "mongoose";

interface IPost {
	postTitle: string;
	projectTitle?: string;
	owner: string;
	description: string;
	genres: string[];
	postType: string;
	likes: {
		user: string;
	}[];
	dateCreated: Date;
	dateUpdated: Date;
	comments?: {
		uid: string;
		owner: string;
		content: string;
		likes: number;
		dateCreated: Date;
	}[];
	collaboration: string;
	collaborationType: string;
	uid: string;
	theme?: {
		background: string;
		postTitle: string;
		projectTitle: string;
		text: string;
		time: string;
	};
}

const postSchema = new Schema<IPost>({
	owner: {
		type: String,
		required: true,
		ref: "User",
	},
	uid: {
		type: String,
		required: true,
	},
	postTitle: {
		type: String,
		required: true,
	},
	projectTitle: {
		type: String,
	},
	description: {
		type: String,
		required: true,
	},
	genres: {
		type: [String],
		required: true,
	},
	postType: {
		type: String,
		required: true,
	},
	collaboration: {
		type: String,
		required: true,
	},
	likes: {
		type: [
			{
				user: {
					type: String,
					required: true,
				},
			},
		],
		required: true,
	},
	dateCreated: {
		type: Date,
		required: true,
	},
	dateUpdated: {
		type: Date,
		required: true,
	},
	comments: {
		type: [
			{
				uid: {
					type: String,
					required: true,
				},
				owner: {
					type: String,
					required: true,
					ref: "User",
				},
				content: {
					type: String,
					required: true,
				},
				likes: {
					type: Number,
					required: true,
				},
				dateCreated: {
					type: Date,
					required: true,
				},
				required: false,
			},
		],
		required: true,
	},
	collaborationType: {
		type: String,
		required: true,
	},
	theme: {
		background: {
			type: String,
			required: false,
		},
		postTitle: {
			type: String,
			required: false,
		},
		projectTitle: {
			type: String,
			required: false,
		},
		text: {
			type: String,
			required: false,
		},
		time: {
			type: String,
			required: false,
		},
	},
});

const Posts = model<IPost>("Post", postSchema);

export default Posts;
