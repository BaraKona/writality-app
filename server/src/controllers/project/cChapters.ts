import Chapter from "../../models/chapterSchema";
import Branch from "../../models/branchSchema";
import Version from "../../models/versionSchema";
import { v4 as uuidv4 } from "uuid";

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

export const mergePositionMain = async (req: any, res: any) => {
  const { userId, projectId, chapterId } = req.params;
  const { content, history, position, dateUpdated } = req.body;
  // TODO: Fix this mess
  try {
    const chapter = await Chapter.findOne({
      uid: chapterId,
      projectId,
      owner: userId,
    });
    const newVersion = new Version({
      ...chapter.content,
      uid: uuidv4(),
      dateUpdated: {
        user: userId,
        date: new Date(),
      },
      dateCreated: {
        user: userId,
        date: new Date(),
      },
      name: "version main",
      type: "Main",
    });
    if (position === "before") {
      chapter.content.content = content.content + chapter.content.content;
    } else {
      chapter.content.content = chapter.content.content + content.content;
    }
    chapter.history = history;
    chapter.dateUpdated = dateUpdated;
    chapter.content.dateUpdated = dateUpdated;
    await newVersion.save();
    await chapter.save();
    res.status(200).json(chapter);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const mergeReplaceMain = async (req: any, res: any) => {
  const { userId, chapterId, projectId } = req.params;
  const { content, history, dateUpdated } = req.body;
  try {
    const chapter = await Chapter.findOne({
      uid: chapterId,
      projectId,
      owner: userId,
    });
    console.log("replace");
    chapter.content.content = content.content;
    chapter.history = history;
    chapter.dateUpdated = dateUpdated;
    chapter.content.dateUpdated = dateUpdated;
    const newVersion = new Version({
      ...chapter.content,
      uid: uuidv4(),
      dateCreated: {
        user: userId,
        date: new Date(),
      },
      type: "Main",
      name: "version main",
    });
    await newVersion.save();
    await chapter.save();
    res.status(200).json(chapter);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
