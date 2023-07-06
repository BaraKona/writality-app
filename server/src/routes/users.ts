import express from "express";
import { createUser, getUser, getAllUsers, signIn } from "../controllers/cUser";

const verifyToken = require("../middleware/jwtAuth");
const router = express.Router();

router.post("/signup", createUser);
// router.post("/", loginUser);
router.get("/:id", verifyToken, getUser);
router.get("/", verifyToken, getAllUsers);
router.post("/signin", signIn);
export default router;
