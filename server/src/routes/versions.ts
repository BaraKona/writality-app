import express from "express";
import {
  getAllChapterVersions,
  getSingleChapterVersion,
  createVersion,
} from "../controllers/cVersions";

const router = express.Router();

router.get("/:chapterId", getAllChapterVersions);
router.get("/:chapterId/:versionId", getSingleChapterVersion);
router.post("/", createVersion);

export default router;
