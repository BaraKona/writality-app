import express from "express";
import {
	addCollaboratorToProject,
	createCollabProject,
	getAllCollabProjectsByUserId,
	getSingleCollabProject,
	updateCollabDescription,
	updateCollabTitle,
} from "../../controllers/collaboration/cCollabProject";

const router = express.Router();

router.post("/", createCollabProject);
router.get("/:userId", getAllCollabProjectsByUserId);
router.get("/:userId/:projectId", getSingleCollabProject);
router.put("/:userId/:projectId", addCollaboratorToProject);
router.patch("/:userId/:projectId/description", updateCollabDescription);
router.patch("/:userId/:projectId/title", updateCollabTitle);

export default router;
