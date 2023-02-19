import express from "express";
import {
	createProject,
	getAllProjects,
	getProject,
	getUserProjects,
	deleteProject,
	updateProjectDescription,
	updateProjectTitle,
} from "../../controllers/project/cProjects";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:userId/:projectId", getProject);
router.get("/:userId", getUserProjects);
router.patch("/:userId/:projectId/description", updateProjectDescription);
router.patch("/:userId/:projectId/title", updateProjectTitle);
router.delete("/:userId/:projectId", deleteProject);
export default router;
