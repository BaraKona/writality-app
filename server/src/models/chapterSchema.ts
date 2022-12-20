import { model, Schema } from "mongoose";

interface Chapter {
  title: string;
  projectId: string;
  uid: string;
  owner: string;
  dateCreated: {
    user: string;
    date: Date;
  };
  dateUpdated?: {
    user: string;
    date: Date;
  };
}

const chapterSchema = new Schema<Chapter>({
  owner: {
    type: String,
    required: true,
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
    },
    date: {
      type: Date,
      required: false,
    },
  },
});

export default model<Chapter>("Chapter", chapterSchema);
