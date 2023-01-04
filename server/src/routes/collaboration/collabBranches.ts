import express from "express";

import {
  getAllCollabChapterBranches,
  getSingleCollabChapterBranch,
  createCollabBranch,
  updateCollabBranch,
  deleteCollabBranch,
} from "../../controllers/collaboration/cCollabBranches";

const router = express.Router();

router.get("/:chapterId", getAllCollabChapterBranches);
router.get("/:chapterId/:branchId", getSingleCollabChapterBranch);
router.patch("/:chapterId/:branchId", updateCollabBranch);
router.post("/", createCollabBranch);
router.delete("/:chapterId/:branchId", deleteCollabBranch);

export default router;
