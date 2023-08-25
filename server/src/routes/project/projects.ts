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
} from "../../controllers/project/cProjects";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/all", protect, getAllProjects);
router.get("/user/:projectId", protect, getProject);
router.get("/user", protect, getUserProjects);
router.patch(
	"/:userId/:projectId/description",
	protect,
	updateProjectDescription
);
router.patch("/user/:projectId/title", protect, updateProjectTitle);
router.delete("/:userId/:projectId", protect, deleteProject);
router.patch("/:userId/:projectId/type", protect, updateProjectType);
router.patch("/user/:projectId/board", protect, updateProjectBoard);
router.get("/favourites", protect, getUserFavourites);
export default router;
