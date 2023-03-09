"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cVersions_1 = require("../../controllers/project/cVersions");
const router = express_1.default.Router();
router.get("/:chapterId", cVersions_1.getAllChapterVersions);
router.get("/:chapterId/:versionId", cVersions_1.getSingleChapterVersion);
router.post("/", cVersions_1.createVersion);
router.delete("/:chapterId/:versionId", cVersions_1.deleteSingleChapterVersion);
exports.default = router;
//# sourceMappingURL=versions.js.map