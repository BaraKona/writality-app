import Chapter from "../../models/chapterSchema";
import Branch from "../../models/branchSchema";
import Version from "../../models/versionSchema";

export const createChapter = async (req: any, res: any) => {
  const {
    title,
    projectId,
    uid,
    dateCreated,
    owner,
    dateUpdated,
    content,
    history,
  } = req.body;
  console.log(req.body);
  const newChapter = new Chapter({
    owner,
    title,
    projectId,
    uid,
    dateCreated,
    dateUpdated,
    content,
    history,
  });
  try {
    await newChapter.save();
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getAllChapters = async (req: any, res: any) => {
  try {
    const chapters = await Chapter.find();
    res.status(200).json(chapters);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProjectChapters = async (req: any, res: any) => {
  const { userId, projectId } = req.params;
  try {
    const chapters = await Chapter.find({
      owner: userId,
      projectId,
    });
    res.status(200).json(chapters);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleChapter = async (req: any, res: any) => {
  const { userId, chapterId, projectId } = req.params;
  try {
    const chapter = await Chapter.findOne({
      owner: userId,
      projectId: projectId,
      uid: chapterId,
    });
    res.status(200).json(chapter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateChapterContent = async (req: any, res: any) => {
  const { userId, chapterId, projectId } = req.params;
  const { content, history } = req.body;
  try {
    const chapter = await Chapter.findOne({
      owner: userId,
      projectId: projectId,
      uid: chapterId,
    });
    chapter.content = content;
    chapter.history = history;
    await chapter.save();
    res.status(200).json(chapter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteSingleChapter = async (req: any, res: any) => {
  const { userId, chapterId, projectId } = req.params;
  try {
    const chapter = await Chapter.findOne({
      owner: userId,
      projectId: projectId,
      uid: chapterId,
    });
    await Version.deleteMany({ chapterId: chapterId });
    await Branch.deleteMany({ chapterId: chapterId });
    await chapter.remove();
    res.status(200).json(chapter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
