import express from "express";
import {
  createProject,
  getAllProjects,
  getProject,
  getUserProjects,
  deleteProject,
} from "../../controllers/project/cProjects";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:userId/:projectId", getProject);
router.get("/:userId", getUserProjects);
router.delete("/:userId/:projectId", deleteProject);
export default router;
