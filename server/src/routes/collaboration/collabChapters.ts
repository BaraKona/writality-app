import express from "express";
import {
	createCollabChapter,
	getCollabChapters,
	deleteCollabChapters,
	getSingleCollabChapter,
	updateCollabChapterContent,
	mergeReplaceMain,
} from "../../controllers/collaboration/cCollabChapters";

const router = express.Router();

router.post("/", createCollabChapter);
router.get("/:projectId", getCollabChapters);
router.get("/:projectId/:chapterId", getSingleCollabChapter);
router.delete("/:userId/:projectId/:chapterId", deleteCollabChapters);
router.patch("/:projectId/:chapterId", updateCollabChapterContent);
router.patch("/merge/replace/:userId/:projectId/:chapterId", mergeReplaceMain);
export default router;
