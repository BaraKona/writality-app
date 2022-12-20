import Chapter from "../models/chapterSchema";

export const createChapter = async (req: any, res: any) => {
  const { title, projectId, uid, dateCreated, owner } = req.body;
  const newChapter = new Chapter({
    owner,
    title,
    projectId,
    uid,
    dateCreated,
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
  // tslint:disable-next-line: no-console
  console.log(userId, projectId);
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
