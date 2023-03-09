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
exports.mergeReplaceMain = exports.mergePositionMain = exports.updateCollabChapterContent = exports.deleteCollabChapters = exports.getSingleCollabChapter = exports.getCollabChapters = exports.createCollabChapter = void 0;
const collabVersionSchema_1 = __importDefault(require("../../models/collabVersionSchema"));
const collabChapterSchema_1 = __importDefault(require("../../models/collabChapterSchema"));
const branchSchema_1 = __importDefault(require("../../models/branchSchema"));
const uuid_1 = require("uuid");
const createCollabChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, uid, dateCreated, projectId, content, owner, history } = req.body;
    const newCollabChapter = new collabChapterSchema_1.default({
        owner,
        title,
        uid,
        dateCreated,
        dateUpdated: dateCreated,
        projectId,
        content,
        history,
    });
    try {
        yield newCollabChapter.save();
        res.status(201).json(newCollabChapter);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
});
exports.createCollabChapter = createCollabChapter;
const getCollabChapters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    try {
        const chapters = yield collabChapterSchema_1.default.find({
            projectId,
        });
        res.status(200).json(chapters);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getCollabChapters = getCollabChapters;
const getSingleCollabChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, chapterId } = req.params;
    try {
        const chapter = yield collabChapterSchema_1.default.findOne({
            projectId,
            uid: chapterId,
        });
        res.status(200).json(chapter);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getSingleCollabChapter = getSingleCollabChapter;
const deleteCollabChapters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, projectId, chapterId } = req.params;
    console.log(userId, projectId, chapterId);
    try {
        const chapter = yield collabChapterSchema_1.default.findOne({
            owner: userId,
            projectId: projectId,
            uid: chapterId,
        });
        console.log(chapter);
        yield collabVersionSchema_1.default.deleteMany({ chapterId: chapterId });
        yield branchSchema_1.default.deleteMany({ chapterId: chapterId });
        yield chapter.remove();
        res.status(200).json(chapter);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.deleteCollabChapters = deleteCollabChapters;
const updateCollabChapterContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId, projectId } = req.params;
    const { content, history } = req.body;
    try {
        const collabChapter = yield collabChapterSchema_1.default.findOne({
            projectId: projectId,
            uid: chapterId,
        });
        collabChapter.content = content;
        collabChapter.history = history;
        yield collabChapter.save();
        res.status(200).json(collabChapter);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.updateCollabChapterContent = updateCollabChapterContent;
const mergePositionMain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, projectId, chapterId } = req.params;
    const { content, history, position, dateUpdated } = req.body;
    // TODO: Fix this mess
    try {
        const chapter = yield collabChapterSchema_1.default.findOne({
            uid: chapterId,
            projectId,
            owner: userId,
        });
        const newVersion = new collabVersionSchema_1.default(Object.assign(Object.assign({}, chapter.content), { uid: (0, uuid_1.v4)(), dateUpdated: {
                user: userId,
                date: new Date(),
            }, dateCreated: {
                user: userId,
                date: new Date(),
            }, name: "previous main", type: "Main" }));
        if (position === "before") {
            chapter.content.content = content.content + chapter.content.content;
        }
        else {
            chapter.content.content = chapter.content.content + content.content;
        }
        chapter.history = history;
        chapter.dateUpdated = dateUpdated;
        chapter.content.dateUpdated = dateUpdated;
        yield newVersion.save();
        yield chapter.save();
        res.status(200).json(chapter);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
exports.mergePositionMain = mergePositionMain;
const mergeReplaceMain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, chapterId, projectId } = req.params;
    const { content, history, dateUpdated } = req.body;
    try {
        const chapter = yield collabChapterSchema_1.default.findOne({
            uid: chapterId,
            projectId,
            owner: userId,
        });
        if (chapter.owner !== userId)
            return res.status(404).json({ message: "Not authorized" });
        console.log("replace");
        chapter.content.content = content.content;
        chapter.history = history;
        chapter.dateUpdated = dateUpdated;
        chapter.content.dateUpdated = dateUpdated;
        const newVersion = new collabVersionSchema_1.default(Object.assign(Object.assign({}, chapter.content), { uid: (0, uuid_1.v4)(), dateCreated: {
                user: userId,
                date: new Date(),
            }, type: "Main", name: "previous main" }));
        yield newVersion.save();
        yield chapter.save();
        res.status(200).json(chapter);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
exports.mergeReplaceMain = mergeReplaceMain;
//# sourceMappingURL=cCollabChapters.js.map