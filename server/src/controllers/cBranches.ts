import Branch from "../models/branchSchema";

export const createBranch = async (req: any, res: any) => {
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
  const newBranch = new Branch({
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
    await newBranch.save();
    res.status(201).json(newBranch);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllChapterBranches = async (req: any, res: any) => {
  const { chapterId } = req.params;
  try {
    const branches = await Branch.find({
      chapterId,
    });
    res.status(200).json(branches);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleChapterBranch = async (req: any, res: any) => {
  const { chapterId, branchId } = req.params;
  try {
    const branch = await Branch.findOne({
      chapterId,
      uid: branchId,
    });
    res.status(200).json(branch);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateBranch = async (req: any, res: any) => {
  const { chapterId, branchId } = req.params;
  const { content, dateUpdated } = req.body;
  try {
    const branch = await Branch.findOneAndUpdate(
      { uid: branchId, chapterId },
      { content: content, dateUpdated: dateUpdated },
      { new: true }
    );
    res.status(200).json(branch);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
