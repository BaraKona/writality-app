"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cBranches_1 = require("../../controllers/project/cBranches");
const router = express_1.default.Router();
router.get("/:chapterId", cBranches_1.getAllChapterBranches);
router.get("/:chapterId/:branchId", cBranches_1.getSingleChapterBranch);
router.patch("/:chapterId/:branchId", cBranches_1.updateBranch);
router.post("/", cBranches_1.createBranch);
router.delete("/:chapterId/:branchId", cBranches_1.deleteBranch);
exports.default = router;
//# sourceMappingURL=branches.js.map