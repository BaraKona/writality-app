import express from "express";
import { createUser, getUser, getAllUsers } from "../controllers/cUser";

const router = express.Router();

router.post("/signup", createUser);
// router.post("/", loginUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);

export default router;
