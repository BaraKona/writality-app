"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleCollabChapterVersion = exports.getSingleCollabChapterVersion = exports.getAllCollabChapterVersions = exports.createCollabVersion = void 0;
const collabVersionSchema_1 = __importDefault(require("../../models/collabVersionSchema"));
const createCollabVersion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, content, uid, dateCreated, dateUpdated, projectId, chapterId, name, } = req.body;
    const newVersion = new collabVersionSchema_1.default({
        type,
        content,
        uid,
        dateCreated,
        dateUpdated,
        projectId,
        chapterId,
        name,
    });
    try {
        yield newVersion.save();
        res.status(201).json(newVersion);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
});
exports.createCollabVersion = createCollabVersion;
const getAllCollabChapterVersions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId } = req.params;
    try {
        const versions = yield collabVersionSchema_1.default.find({
            chapterId,
        });
        res.status(200).json(versions);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAllCollabChapterVersions = getAllCollabChapterVersions;
const getSingleCollabChapterVersion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId, versionId } = req.params;
    try {
        const version = yield collabVersionSchema_1.default.findOne({
            chapterId,
            uid: versionId,
        });
        res.status(200).json(version);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getSingleCollabChapterVersion = getSingleCollabChapterVersion;
const deleteSingleCollabChapterVersion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId, versionId } = req.params;
    try {
        const version = yield collabVersionSchema_1.default.findOneAndDelete({
            chapterId,
            uid: versionId,
        });
        res.status(200).json(version);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.deleteSingleCollabChapterVersion = deleteSingleCollabChapterVersion;
//# sourceMappingURL=cCollabVersions.js.map