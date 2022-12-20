import express from "express";

import {
  createChapter,
  getProjectChapters,
  getSingleChapter,
} from "../controllers/cChapters";

const router = express.Router();

router.post("/", createChapter);

router.get("/:userId/:projectId/:chapterId/", getSingleChapter);
router.get("/:userId/:projectId", getProjectChapters);

export default router;
