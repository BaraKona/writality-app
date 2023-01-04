import { model, Schema } from "mongoose";

interface IBranch {
  type: string;
  content: string;
  uid: string;
  name: string;
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
}

const collabBranchSchema = new Schema<IBranch>({
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

const CollabBranch = model<IBranch>("collaboration-branch", collabBranchSchema);

export default CollabBranch;
