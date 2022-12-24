import { model, Schema } from "mongoose";

interface IChapterContent {
  type: string;
  content: string;
  uid: string;
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
interface Chapter {
  title: string;
  projectId: string;
  uid: string;
  owner: string;
  dateCreated: {
    user: string;
    date: Date;
  };
  dateUpdated: {
    user: string;
    date: Date;
  };
  content: IChapterContent;
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
  content: {
    type: {
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
  },
});

export default model<Chapter>("Chapter", chapterSchema);
