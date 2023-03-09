"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cPosts_1 = require("../controllers/cPosts");
const router = express_1.default.Router();
router.get("/", cPosts_1.getPosts);
router.post("/", cPosts_1.createPost);
exports.default = router;
//# sourceMappingURL=posts.js.map