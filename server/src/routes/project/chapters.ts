import express from "express";

import {
  createChapter,
  getProjectChapters,
  getSingleChapter,
  updateChapterContent,
  deleteSingleChapter,
} from "../../controllers/project/cChapters";

const router = express.Router();

router.post("/", createChapter);
router.put("/:userId/:projectId/:chapterId/", updateChapterContent);
router.get("/:userId/:projectId/:chapterId/", getSingleChapter);
router.get("/:userId/:projectId", getProjectChapters);
router.delete("/:userId/:projectId/:chapterId/", deleteSingleChapter);

export default router;
