import CollabBranch from "../../models/collabBranchSchema";

export const createCollabBranch = async (req: any, res: any) => {
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
  const newBranch = new CollabBranch({
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

export const getAllCollabChapterBranches = async (req: any, res: any) => {
  const { chapterId } = req.params;
  try {
    const branches = await CollabBranch.find({
      chapterId,
    });
    res.status(200).json(branches);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleCollabChapterBranch = async (req: any, res: any) => {
  const { chapterId, branchId } = req.params;
  try {
    const branch = await CollabBranch.findOne({
      chapterId,
      uid: branchId,
    });
    res.status(200).json(branch);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCollabBranch = async (req: any, res: any) => {
  const { chapterId, branchId } = req.params;
  const { content, dateUpdated } = req.body;
  try {
    const branch = await CollabBranch.findOneAndUpdate(
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

export const deleteCollabBranch = async (req: any, res: any) => {
  const { chapterId, branchId } = req.params;
  try {
    await CollabBranch.findOneAndDelete({
      uid: branchId,
      chapterId,
    });
    res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
