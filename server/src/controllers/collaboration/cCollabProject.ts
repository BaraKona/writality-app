import CollabProject from "../../models/collabProjectSchema";

export const createCollabProject = async (req: any, res: any) => {
  const { title, uid, dateCreated, owner, collaborators, description, type } =
    req.body;
  const newCollabProject = new CollabProject({
    owner,
    title,
    uid,
    dateCreated,
    collaborators,
    description,
    type,
  });
  try {
    await newCollabProject.save();
    res.status(201).json(newCollabProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllCollabProjectsByUserId = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const collabProjects = await CollabProject.find({
      $or: [
        { owner: userId },
        { collaborators: { $elemMatch: { user: userId } } },
      ],
    });
    res.status(200).json(collabProjects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleCollabProject = async (req: any, res: any) => {
  const { userId, projectId } = req.params;
  try {
    const collabProject = await CollabProject.findOne({
      $or: [
        { owner: userId },
        { collaborators: { $elemMatch: { user: userId } } },
      ],
      uid: projectId,
    });
    res.status(200).json(collabProject);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCollaboratorToProject = async (req: any, res: any) => {
  const { userId, projectId } = req.params;
  const { collaboratorId } = req.body;
  try {
    const collabProject = await CollabProject.findOne({
      owner: userId,
      uid: projectId,
    });
    collabProject.collaborators.push({
      user: collaboratorId,
      dateJoined: new Date(),
    });
    await collabProject.save();
    res.status(200).json(collabProject);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
