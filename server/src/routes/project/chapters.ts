import express from "express";
import { protect } from "../../middleware/jwtAuth";
import {
	getSingleChapter,
	updateChapterContent,
	mergeReplaceMain,
	mergePositionMain,
	updateChapterTitle,
	getUserChapters,
	createVersion,
	getProjectChapters,
} from "../../controllers/project/cChapters";

const router = express.Router();


router.get("/chapters/:projectId", protect, getProjectChapters);
// router.post("/", protect, createChapter);
router.patch("/content/:projectId/:chapterId/", protect, updateChapterContent);

router.post("/version/create/:projectId/:chapterId", protect, createVersion);

router.get("/single/:projectId/:chapterId/", protect, getSingleChapter);
// router.get("/:userId/:projectId", protect, getProjectChapters);
router.post("/chapters/:projectId", protect, getUserChapters);
// router.delete("/:userId/:projectId/:chapterId/", protect, deleteSingleChapter);
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
