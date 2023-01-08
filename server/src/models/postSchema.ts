import { Schema, model } from "mongoose";

interface IPost {
  title: string;
  subtitle?: string;
  description: string;
  genres: string[];
  postType: string;
  likes: {
    user: string;
  }[];
  dateCreated: Date;
  comments?: {
    uid: string;
    owner: string;
    content: string;
    likes: number;
    dateCreated: Date;
  }[];
  collaboration: string;
  collaborationType: string;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
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
});

const Posts = model<IPost>("Post", postSchema);

export default Posts;
