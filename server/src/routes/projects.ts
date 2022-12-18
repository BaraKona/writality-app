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
router.get("/:uid", getProject);
router.get("/user/:uid", getUserProjects);

export default router;
