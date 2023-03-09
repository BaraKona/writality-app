"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cCollabBranches_1 = require("../../controllers/collaboration/cCollabBranches");
const router = express_1.default.Router();
router.get("/:chapterId", cCollabBranches_1.getAllCollabChapterBranches);
router.get("/:chapterId/:branchId", cCollabBranches_1.getSingleCollabChapterBranch);
router.patch("/:chapterId/:branchId", cCollabBranches_1.updateCollabBranch);
router.post("/", cCollabBranches_1.createCollabBranch);
router.delete("/:chapterId/:branchId", cCollabBranches_1.deleteCollabBranch);
exports.default = router;
//# sourceMappingURL=collabBranches.js.map