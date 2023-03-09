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
exports.mergeReplaceMain = exports.mergePositionMain = exports.deleteSingleChapter = exports.updateChapterContent = exports.getSingleChapter = exports.getProjectChapters = exports.getAllChapters = exports.createChapter = void 0;
const chapterSchema_1 = __importDefault(require("../../models/chapterSchema"));
const branchSchema_1 = __importDefault(require("../../models/branchSchema"));
const versionSchema_1 = __importDefault(require("../../models/versionSchema"));
const uuid_1 = require("uuid");
const createChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, projectId, uid, dateCreated, owner, dateUpdated, content, history, } = req.body;
    const newChapter = new chapterSchema_1.default({
        owner,
        title,
        projectId,
        uid,
        dateCreated,
        dateUpdated,
        content,
        history,
    });
    try {
        yield newChapter.save();
        res.status(201).json(newChapter);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
});
exports.createChapter = createChapter;
const getAllChapters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chapters = yield chapterSchema_1.default.find();
        res.status(200).json(chapters);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAllChapters = getAllChapters;
const getProjectChapters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, projectId } = req.params;
    try {
        const chapters = yield chapterSchema_1.default.find({
            owner: userId,
            projectId,
        });
        res.status(200).json(chapters);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getProjectChapters = getProjectChapters;
const getSingleChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, chapterId, projectId } = req.params;
    try {
        const chapter = yield chapterSchema_1.default.findOne({
            owner: userId,
            projectId: projectId,
            uid: chapterId,
        });
        res.status(200).json(chapter);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getSingleChapter = getSingleChapter;
const updateChapterContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, chapterId, projectId } = req.params;
    const { content, history } = req.body;
    try {
        const chapter = yield chapterSchema_1.default.findOne({
            owner: userId,
            projectId: projectId,
            uid: chapterId,
        });
        chapter.content = content;
        chapter.history = history;
        yield chapter.save();
        res.status(200).json(chapter);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.updateChapterContent = updateChapterContent;
const deleteSingleChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, chapterId, projectId } = req.params;
    try {
        const chapter = yield chapterSchema_1.default.findOne({
            owner: userId,
            projectId: projectId,
            uid: chapterId,
        });
        yield versionSchema_1.default.deleteMany({ chapterId: chapterId });
        yield branchSchema_1.default.deleteMany({ chapterId: chapterId });
        yield chapter.remove();
        res.status(200).json(chapter);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.deleteSingleChapter = deleteSingleChapter;
const mergePositionMain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, projectId, chapterId } = req.params;
    const { content, history, position, dateUpdated } = req.body;
    try {
        const chapter = yield chapterSchema_1.default.findOne({
            uid: chapterId,
            projectId,
            owner: userId,
        });
        const newVersion = new versionSchema_1.default(Object.assign(Object.assign({}, chapter.content), { uid: (0, uuid_1.v4)(), dateUpdated: {
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
        const chapter = yield chapterSchema_1.default.findOne({
            uid: chapterId,
            projectId,
            owner: userId,
        });
        console.log("replace");
        chapter.content.content = content.content;
        chapter.history = history;
        chapter.dateUpdated = dateUpdated;
        chapter.content.dateUpdated = dateUpdated;
        const newVersion = new versionSchema_1.default(Object.assign(Object.assign({}, chapter.content), { uid: (0, uuid_1.v4)(), dateCreated: {
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
//# sourceMappingURL=cChapters.js.map