import express from "express";
import {
	createProject,
	getAllProjects,
	getProject,
	getUserProjects,
	deleteProject,
	updateProjectDescription,
	updateProjectTitle,
	updateProjectType,
} from "../../controllers/project/cProjects";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:userId/:projectId", getProject);
router.get("/:userId", getUserProjects);
router.patch("/:userId/:projectId/description", updateProjectDescription);
router.patch("/:userId/:projectId/title", updateProjectTitle);
router.delete("/:userId/:projectId", deleteProject);
router.patch("/:userId/:projectId/type", updateProjectType);
export default router;
