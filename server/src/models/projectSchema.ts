import { Schema, model } from "mongoose";

interface IProject {
  type: string;
  uid: string;
  owner: string;
  title?: string;
  description?: string;
  dateCreated: {
    user: string;
    date: Date;
  };
  dateUpdated?: {
    user: string;
    date: Date;
  };
}
const projectSchema = new Schema<IProject>({
  type: { type: String, required: true },
  uid: { type: String, required: true },
  owner: { type: String, required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  dateCreated: {
    user: { type: String, required: true },
    date: { type: Date, required: true },
  },
  dateUpdated: {
    user: { type: String, required: false },
    date: { type: Date, required: false },
  },
});

const Project = model<IProject>("Project", projectSchema);

export default Project;
