import express from "express";
import { protect } from "../../middleware/jwtAuth";
import {
	createProject,
	getAllProjects,
	getProject,
	getUserProjects,
	deleteProject,
	updateProjectDescription,
	updateProjectTitle,
	updateProjectType,
	getUserFavourites,
	updateProjectBoard,
	createFolder,
	createProjectChapter,
	deleteProjectChapter,
	getProjectChapters,
} from "../../controllers/project/cProjects";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/all", protect, getAllProjects);
router.get("/user/:projectId", protect, getProject);
router.get("/user", protect, getUserProjects);
router.get("/chapters/:projectId", protect, getProjectChapters);
router.patch(
	"/:userId/:projectId/description",
	protect,
	updateProjectDescription
);
router.patch("/user/:projectId/title", protect, updateProjectTitle);
router.delete("/project/:userId/:projectId", protect, deleteProject);
router.delete("/chapter/:projectId/:chapterId", protect, deleteProjectChapter);
router.patch("/:userId/:projectId/type", protect, updateProjectType);
router.patch("/user/:projectId/board", protect, updateProjectBoard);
router.get("/favourites", protect, getUserFavourites);
router.post("/folder/:projectId", protect, createFolder);
router.post("/chapter/:projectId", protect, createProjectChapter);
export default router;
