import { Schema, model } from "mongoose";

interface ICollabProject {
  uid: string;
  title: string;
  dateCreated: {
    user: string;
    date: Date;
  };
  owner: string;
  collaborators?: [
    {
      user: string;
      dateJoined: Date;
    }
  ];
  description: string;
  type: string;
}

const collabProjectSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  title: {
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
  owner: {
    type: String,
    required: true,
  },
  collaborators: [
    {
      user: {
        type: String,
        required: false,
      },
      dateJoined: {
        type: Date,
        required: false,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export default model<ICollabProject>("CollabProject", collabProjectSchema);
