import express from "express";
import {
  createProject,
  getAllProjects,
  getProject,
  getUserProjects,
} from "../controllers/cProjects";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:userId/:projectId", getProject);
router.get("/user/:userId", getUserProjects);

export default router;
