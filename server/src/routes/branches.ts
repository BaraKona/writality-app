import express from "express";

import {
  getAllChapterBranches,
  getSingleChapterBranch,
  createBranch,
  updateBranch,
} from "../controllers/cBranches";

const router = express.Router();

router.get("/:chapterId", getAllChapterBranches);
router.get("/:chapterId/:branchId", getSingleChapterBranch);
router.patch("/:chapterId/:branchId", updateBranch);
router.post("/", createBranch);

export default router;
