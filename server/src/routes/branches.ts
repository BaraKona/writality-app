import express from "express";

import {
  getAllChapterBranches,
  getSingleChapterBranch,
  createBranch,
} from "../controllers/cBranches";

const router = express.Router();

router.get("/:chapterId", getAllChapterBranches);
router.get("/:chapterId/:branchId", getSingleChapterBranch);
router.post("/", createBranch);

export default router;
