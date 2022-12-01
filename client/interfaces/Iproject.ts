export type IProject = {
  uid: string;
  projectTitle: string;
  createdAt?: Date;
  owner: string;
  projectOwner: string;
  collaborators?: string[];
};
