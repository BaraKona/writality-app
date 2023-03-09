"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cChat_1 = require("../../controllers/chat/cChat");
const router = express_1.default.Router();
router.get("/:projectId", cChat_1.getProjectChat);
router.post("/:projectId", cChat_1.commentOnChat);
router.post("/", cChat_1.createChat);
exports.default = router;
//# sourceMappingURL=chat.js.map