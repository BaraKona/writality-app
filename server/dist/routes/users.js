"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cUser_1 = require("../controllers/cUser");
const router = express_1.default.Router();
router.post("/signup", cUser_1.createUser);
// router.post("/", loginUser);
router.get("/:id", cUser_1.getUser);
router.get("/", cUser_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=users.js.map