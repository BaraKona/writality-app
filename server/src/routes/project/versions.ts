import express from "express";
import { protect } from "../../middleware/jwtAuth";
import {
	getAllChapterVersions,
	getSingleChapterVersion,
	createVersion,
	deleteSingleChapterVersion,
} from "../../controllers/project/cVersions";

const router = express.Router();

router.get("/:chapterId", protect, getAllChapterVersions);
router.get("/:chapterId/:versionId", protect, getSingleChapterVersion);
router.post("/", protect, createVersion);
router.delete("/:chapterId/:versionId", protect, deleteSingleChapterVersion);

export default router;
