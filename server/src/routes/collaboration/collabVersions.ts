import express from "express";
import {
  getAllCollabChapterVersions,
  getSingleCollabChapterVersion,
  createCollabVersion,
  deleteSingleCollabChapterVersion,
} from "../../controllers/collaboration/cCollabVersions";

const router = express.Router();

router.get("/:chapterId", getAllCollabChapterVersions);
router.get("/:chapterId/:versionId", getSingleCollabChapterVersion);
router.post("/", createCollabVersion);
router.delete("/:chapterId/:versionId", deleteSingleCollabChapterVersion);

export default router;
