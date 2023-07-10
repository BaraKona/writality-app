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
} from "../../controllers/project/cProjects";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/all", protect, getAllProjects);
router.get("/:userId/:projectId", protect, getProject);
router.get("/user", protect, getUserProjects);
router.patch(
	"/:userId/:projectId/description",
	protect,
	updateProjectDescription
);
router.patch("/:userId/:projectId/title", protect, updateProjectTitle);
router.delete("/:userId/:projectId", protect, deleteProject);
router.patch("/:userId/:projectId/type", protect, updateProjectType);
router.get("/favourites", protect, getUserFavourites);
export default router;
