import express from "express";
import { protect } from "../../middleware/jwtAuth";
import {
	getAllChapterBranches,
	getSingleChapterBranch,
	createBranch,
	updateBranch,
	deleteBranch,
} from "../../controllers/project/cBranches";

const router = express.Router();

router.get("/:chapterId", protect, getAllChapterBranches);
router.get("/:chapterId/:branchId", protect, getSingleChapterBranch);
router.patch("/:chapterId/:branchId", protect, updateBranch);
router.post("/", protect, createBranch);
router.delete("/:chapterId/:branchId", protect, deleteBranch);

export default router;
