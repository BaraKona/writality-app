import { model, Schema } from "mongoose";

interface IVersion {
	type: string;
	content: string;
	uid: string;
	name: string;
	dateCreated: {
		user: string;
		date: Date;
	};
	projectId: string;
	chapterId: string;
}

const versionSchema = new Schema<IVersion>({
	type: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
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
	projectId: {
		type: String,
		required: true,
	},
	chapterId: {
		type: String,
		required: true,
	},
});

const Version = model<IVersion>("Version", versionSchema);

export default Version;
