import Version from "../../models/versionSchema";
import CollabChapter from "../../models/collabChapterSchema";
import Branch from "../../models/branchSchema";

export const createCollabChapter = async (req: any, res: any) => {
  const { title, uid, dateCreated, projectId, content, owner, history } =
    req.body;
  const newCollabChapter = new CollabChapter({
    owner,
    title,
    uid,
    dateCreated,
    dateUpdated: dateCreated,
    projectId,
    content,
    history,
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

export const getSingleCollabChapter = async (req: any, res: any) => {
  const { projectId, chapterId } = req.params;
  try {
    const chapter = await CollabChapter.findOne({
      projectId,
      uid: chapterId,
    });
    res.status(200).json(chapter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCollabChapters = async (req: any, res: any) => {
  const { userId, projectId, chapterId } = req.params;
  console.log(userId, projectId, chapterId);
  try {
    const chapter = await CollabChapter.findOne({
      owner: userId,
      projectId: projectId,
      uid: chapterId,
    });
    console.log(chapter);
    await Version.deleteMany({ chapterId: chapterId });
    await Branch.deleteMany({ chapterId: chapterId });
    await chapter.remove();
    res.status(200).json(chapter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCollabChapterContent = async (req: any, res: any) => {
  const { chapterId, projectId } = req.params;
  const { content, history } = req.body;
  try {
    const collabChapter = await CollabChapter.findOne({
      projectId: projectId,
      uid: chapterId,
    });
    collabChapter.content = content;
    collabChapter.history = history;
    await collabChapter.save();
    res.status(200).json(collabChapter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
