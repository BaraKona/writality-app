"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cCollabVersions_1 = require("../../controllers/collaboration/cCollabVersions");
const router = express_1.default.Router();
router.get("/:chapterId", cCollabVersions_1.getAllCollabChapterVersions);
router.get("/:chapterId/:versionId", cCollabVersions_1.getSingleCollabChapterVersion);
router.post("/", cCollabVersions_1.createCollabVersion);
router.delete("/:chapterId/:versionId", cCollabVersions_1.deleteSingleCollabChapterVersion);
exports.default = router;
//# sourceMappingURL=collabVersions.js.map