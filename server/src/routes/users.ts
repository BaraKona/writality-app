import express from "express";
import { createUser, getUser } from "../controllers/cUser";

const router = express.Router();

router.post("/signup", createUser);
// router.post("/", loginUser);
router.get("/:id", getUser);

export default router;
