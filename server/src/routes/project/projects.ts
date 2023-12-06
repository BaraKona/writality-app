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
	moveProjectChapterIntoFolder,
	getOpenFolderChapters,
	getUserProfileProjects,
	getSingleUserProjects,
	nestFolder,
	updateFolderName
} from "../../controllers/project/cProjects";

const router = express.Router();

router.get("/all", protect, getAllProjects);
router.get("/profile", protect, getUserProfileProjects);
router.get("/user", protect, getUserProjects);
router.get("/public/:userId", protect, getSingleUserProjects);
router.get("/user/:projectId", protect, getProject);
router.get("/chapters/:projectId", protect, getProjectChapters);
router.get("/open-folder/:projectId/:folderId", protect, getOpenFolderChapters);
router.get("/favourites", protect, getUserFavourites);

router.delete("/project/user/:projectId", protect, deleteProject);
router.delete("/chapter/:projectId/:chapterId", protect, deleteProjectChapter);

router.patch("/user/:projectId/description", protect, updateProjectDescription);
router.patch("/user/:projectId/title", protect, updateProjectTitle);
router.patch("/user/:projectId/type", protect, updateProjectType);
router.patch("/user/:projectId/board", protect, updateProjectBoard);
router.patch(
	"/chapter/move-to-folder/:projectId/:chapterId",
	protect,
	moveProjectChapterIntoFolder
);
router.patch("/folder/nest/:projectId/:folderId", protect, nestFolder);
router.patch("/folder/name/:projectId/:folderId", protect, updateFolderName);

router.post("/", protect, createProject);
router.post("/folder/:projectId", protect, createFolder);
router.post("/chapter/:projectId", protect, createProjectChapter);


export default router;
