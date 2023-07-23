import express from "express";
import { protect } from "../../middleware/jwtAuth";
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

router.post("/", protect, createChapter);
router.patch("/content/:projectId/:chapterId/", protect, updateChapterContent);
router.get("/single/:projectId/:chapterId/", protect, getSingleChapter);
router.get("/:userId/:projectId", protect, getProjectChapters);
router.delete("/:userId/:projectId/:chapterId/", protect, deleteSingleChapter);
router.patch(
	"/merge/replace/:projectId/:chapterId/",
	protect,
	mergeReplaceMain
);
router.patch(
	"/merge/position/:userId/:projectId/:chapterId/",
	protect,
	mergePositionMain
);
router.put(
	"/title/:userId/:projectId/:chapterId/",
	protect,
	updateChapterTitle
);

export default router;
