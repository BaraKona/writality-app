"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cUser_1 = require("../controllers/cUser");
const router = express_1.default.Router();
router.post("/signup", cUser_1.createUser);
router.post("/login", cUser_1.loginUser);
//# sourceMappingURL=user.js.map