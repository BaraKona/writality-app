import express from "express";

import {
	createChapter,
	getProjectChapters,
	getSingleChapter,
	updateChapterContent,
	deleteSingleChapter,
	mergeReplaceMain,
	mergePositionMain,
	updateChapterTitle,
} from "../../controllers/project/cChapters";

const router = express.Router();

router.post("/", createChapter);
router.put("/:userId/:projectId/:chapterId/", updateChapterContent);
router.get("/:userId/:projectId/:chapterId/", getSingleChapter);
router.get("/:userId/:projectId", getProjectChapters);
router.delete("/:userId/:projectId/:chapterId/", deleteSingleChapter);
router.patch("/merge/replace/:userId/:projectId/:chapterId/", mergeReplaceMain);
router.patch(
	"/merge/position/:userId/:projectId/:chapterId/",
	mergePositionMain
);
router.put("/title/:userId/:projectId/:chapterId/", updateChapterTitle);

export default router;
