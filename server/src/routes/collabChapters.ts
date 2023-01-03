import express from "express";
import {
  createCollabChapter,
  getCollabChapters,
} from "../controllers/cCollabChapters";

const router = express.Router();

router.post("/", createCollabChapter);
router.get("/:projectId", getCollabChapters);

export default router;
