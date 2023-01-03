import CollabChapter from "../models/collabChapterSchema";

export const createCollabChapter = async (req: any, res: any) => {
  const { title, uid, dateCreated, projectId, content, owner } = req.body;
  const newCollabChapter = new CollabChapter({
    owner,
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

export const getCollabChapters = async (req: any, res: any) => {
  const { projectId } = req.params;
  try {
    const chapters = await CollabChapter.find({
      projectId,
    });
    res.status(200).json(chapters);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
