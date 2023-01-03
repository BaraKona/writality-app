import express from "express";
import {
  createCollabChapter,
  getCollabChapters,
  deleteCollabChapters,
} from "../controllers/cCollabChapters";

const router = express.Router();

router.post("/", createCollabChapter);
router.get("/:projectId", getCollabChapters);
router.delete("/:userId/:projectId/:chapterId", deleteCollabChapters);
export default router;
