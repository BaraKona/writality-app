export type IProject = {
  uid: string;
  title?: string;
  dateCreated: {
    user: string;
    date: Date;
  };
  owner: string;
  projectOwner: string;
  collaborators?: [
    {
      user: string;
      dateJoined: Date;
    }
  ];
  description?: string;
  type: string;
};
