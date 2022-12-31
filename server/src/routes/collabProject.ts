import express from "express";
import {
  addCollaboratorToProject,
  createCollabProject,
  getAllCollabProjectsByUserId,
  getSingleCollabProject,
} from "../controllers/cCollabProject";

const router = express.Router();

router.post("/", createCollabProject);
router.get("/:userId", getAllCollabProjectsByUserId);
router.get("/:userId/:projectId", getSingleCollabProject);
router.put("/:userId/:projectId", addCollaboratorToProject);

export default router;
