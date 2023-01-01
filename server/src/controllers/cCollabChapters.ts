import CollabChapter from "../models/collabChapterSchema";

export const createCollabChapter = async (req: any, res: any) => {
  const { title, uid, dateCreated, projectId, content } = req.body;
  const newCollabChapter = new CollabChapter({
    title,
    uid,
    dateCreated,
    projectId,
    content,
  });
  try {
    await newCollabChapter.save();
    res.status(201).json(newCollabChapter);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
