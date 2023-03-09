"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cChapters_1 = require("../../controllers/project/cChapters");
const router = express_1.default.Router();
router.post("/", cChapters_1.createChapter);
router.put("/:userId/:projectId/:chapterId/", cChapters_1.updateChapterContent);
router.get("/:userId/:projectId/:chapterId/", cChapters_1.getSingleChapter);
router.get("/:userId/:projectId", cChapters_1.getProjectChapters);
router.delete("/:userId/:projectId/:chapterId/", cChapters_1.deleteSingleChapter);
router.patch("/merge/replace/:userId/:projectId/:chapterId/", cChapters_1.mergeReplaceMain);
router.patch("/merge/position/:userId/:projectId/:chapterId/", cChapters_1.mergePositionMain);
exports.default = router;
//# sourceMappingURL=chapters.js.map