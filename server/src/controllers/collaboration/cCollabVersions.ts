import CollabVersion from "../../models/collabVersionSchema";

export const createCollabVersion = async (req: any, res: any) => {
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

  const newVersion = new CollabVersion({
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

export const getAllCollabChapterVersions = async (req: any, res: any) => {
  const { chapterId } = req.params;
  try {
    const versions = await CollabVersion.find({
      chapterId,
    });
    res.status(200).json(versions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleCollabChapterVersion = async (req: any, res: any) => {
  const { chapterId, versionId } = req.params;
  try {
    const version = await CollabVersion.findOne({
      chapterId,
      uid: versionId,
    });
    res.status(200).json(version);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteSingleCollabChapterVersion = async (req: any, res: any) => {
  const { chapterId, versionId } = req.params;
  try {
    const version = await CollabVersion.findOneAndDelete({
      chapterId,
      uid: versionId,
    });
    res.status(200).json(version);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
