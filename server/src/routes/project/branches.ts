import express from "express";

import {
  getAllChapterBranches,
  getSingleChapterBranch,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../../controllers/project/cBranches";

const router = express.Router();

router.get("/:chapterId", getAllChapterBranches);
router.get("/:chapterId/:branchId", getSingleChapterBranch);
router.patch("/:chapterId/:branchId", updateBranch);
router.post("/", createBranch);
router.delete("/:chapterId/:branchId", deleteBranch);

export default router;
