import express from "express";
import { createUser, loginUser } from "../controllers/cUser";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
