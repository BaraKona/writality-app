"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cCollabChapters_1 = require("../../controllers/collaboration/cCollabChapters");
const router = express_1.default.Router();
router.post("/", cCollabChapters_1.createCollabChapter);
router.get("/:projectId", cCollabChapters_1.getCollabChapters);
router.get("/:projectId/:chapterId", cCollabChapters_1.getSingleCollabChapter);
router.delete("/:userId/:projectId/:chapterId", cCollabChapters_1.deleteCollabChapters);
router.patch("/:projectId/:chapterId", cCollabChapters_1.updateCollabChapterContent);
router.patch("/merge/replace/:userId/:projectId/:chapterId", cCollabChapters_1.mergeReplaceMain);
exports.default = router;
//# sourceMappingURL=collabChapters.js.map