import express from "express";
import {
  getAllChapterVersions,
  getSingleChapterVersion,
  createVersion,
  deleteSingleChapterVersion,
} from "../../controllers/project/cVersions";

const router = express.Router();

router.get("/:chapterId", getAllChapterVersions);
router.get("/:chapterId/:versionId", getSingleChapterVersion);
router.post("/", createVersion);
router.delete("/:chapterId/:versionId", deleteSingleChapterVersion);

export default router;
