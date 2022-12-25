import express from "express";

import {
  createChapter,
  getProjectChapters,
  getSingleChapter,
  updateChapterContent,
} from "../controllers/cChapters";

const router = express.Router();

router.post("/", createChapter);
router.put("/:userId/:projectId/:chapterId/", updateChapterContent);
router.get("/:userId/:projectId/:chapterId/", getSingleChapter);
router.get("/:userId/:projectId", getProjectChapters);

export default router;
