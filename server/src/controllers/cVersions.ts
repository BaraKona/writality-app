import Version from "../models/versionSchema";

export const createVersion = async (req: any, res: any) => {
  const {
    type,
    content,
    uid,
    dateCreated,
    dateUpdated,
    projectId,
    chapterId,
    name,
  } = req.body;

  const newVersion = new Version({
    type,
    content,
    uid,
    dateCreated,
    dateUpdated,
    projectId,
    chapterId,
    name,
  });

  try {
    await newVersion.save();
    res.status(201).json(newVersion);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllChapterVersions = async (req: any, res: any) => {
  const { chapterId } = req.params;
  try {
    const versions = await Version.find({
      chapterId,
    });
    res.status(200).json(versions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleChapterVersion = async (req: any, res: any) => {
  const { chapterId, versionId } = req.params;
  try {
    const version = await Version.findOne({
      chapterId,
      uid: versionId,
    });
    res.status(200).json(version);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
