"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cCollabProject_1 = require("../../controllers/collaboration/cCollabProject");
const router = express_1.default.Router();
router.post("/", cCollabProject_1.createCollabProject);
router.get("/:userId", cCollabProject_1.getAllCollabProjectsByUserId);
router.get("/:userId/:projectId", cCollabProject_1.getSingleCollabProject);
router.put("/:userId/:projectId", cCollabProject_1.addCollaboratorToProject);
router.patch("/:userId/:projectId/description", cCollabProject_1.updateCollabDescription);
router.patch("/:userId/:projectId/title", cCollabProject_1.updateCollabTitle);
exports.default = router;
//# sourceMappingURL=collabProject.js.map