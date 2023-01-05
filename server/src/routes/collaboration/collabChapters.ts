import express from "express";
import {
  createCollabChapter,
  getCollabChapters,
  deleteCollabChapters,
  getSingleCollabChapter,
  updateCollabChapterContent,
} from "../../controllers/collaboration/cCollabChapters";

const router = express.Router();

router.post("/", createCollabChapter);
router.get("/:projectId", getCollabChapters);
router.get("/:projectId/:chapterId", getSingleCollabChapter);
router.delete("/:userId/:projectId/:chapterId", deleteCollabChapters);
router.patch("/:projectId/:chapterId", updateCollabChapterContent);
export default router;
