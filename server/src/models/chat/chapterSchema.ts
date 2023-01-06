import { Schema, model } from "mongoose";

interface IChat {
  uid: string;
  projectId: string;
  comments: {
    uid: string;
    user: string;
    date: Date;
    content: string;
  }[];
}

const chatSchema = new Schema<IChat>({
  uid: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  comments: [
    {
      uid: {
        type: String,
        required: true,
      },
      user: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

export default model<IChat>("collaboration-chat", chatSchema);
