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
exports.deleteCollabBranch = exports.updateCollabBranch = exports.getSingleCollabChapterBranch = exports.getAllCollabChapterBranches = exports.createCollabBranch = void 0;
const collabBranchSchema_1 = __importDefault(require("../../models/collabBranchSchema"));
const createCollabBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, content, uid, dateCreated, dateUpdated, projectId, chapterId, name, } = req.body;
    const newBranch = new collabBranchSchema_1.default({
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
        yield newBranch.save();
        res.status(201).json(newBranch);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
});
exports.createCollabBranch = createCollabBranch;
const getAllCollabChapterBranches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId } = req.params;
    try {
        const branches = yield collabBranchSchema_1.default.find({
            chapterId,
        });
        res.status(200).json(branches);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAllCollabChapterBranches = getAllCollabChapterBranches;
const getSingleCollabChapterBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId, branchId } = req.params;
    try {
        const branch = yield collabBranchSchema_1.default.findOne({
            chapterId,
            uid: branchId,
        });
        res.status(200).json(branch);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getSingleCollabChapterBranch = getSingleCollabChapterBranch;
const updateCollabBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId, branchId } = req.params;
    const { content, dateUpdated } = req.body;
    console.log("updateCollabBranch: ", chapterId, branchId, content, dateUpdated);
    try {
        const branch = yield collabBranchSchema_1.default.findOneAndUpdate({ uid: branchId, chapterId }, { content: content, dateUpdated: dateUpdated }, { new: true });
        console.log(branch);
        res.status(200).json(branch);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
exports.updateCollabBranch = updateCollabBranch;
const deleteCollabBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId, branchId } = req.params;
    try {
        yield collabBranchSchema_1.default.findOneAndDelete({
            uid: branchId,
            chapterId,
        });
        res.status(200).json({ message: "Branch deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.deleteCollabBranch = deleteCollabBranch;
//# sourceMappingURL=cCollabBranches.js.map