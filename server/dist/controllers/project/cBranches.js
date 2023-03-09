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
exports.deleteBranch = exports.updateBranch = exports.getSingleChapterBranch = exports.getAllChapterBranches = exports.createBranch = void 0;
const branchSchema_1 = __importDefault(require("../../models/branchSchema"));
const createBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, content, uid, dateCreated, dateUpdated, projectId, chapterId, name, } = req.body;
    const newBranch = new branchSchema_1.default({
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
exports.createBranch = createBranch;
const getAllChapterBranches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId } = req.params;
    try {
        const branches = yield branchSchema_1.default.find({
            chapterId,
        });
        res.status(200).json(branches);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAllChapterBranches = getAllChapterBranches;
const getSingleChapterBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId, branchId } = req.params;
    try {
        const branch = yield branchSchema_1.default.findOne({
            chapterId,
            uid: branchId,
        });
        res.status(200).json(branch);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getSingleChapterBranch = getSingleChapterBranch;
const updateBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId, branchId } = req.params;
    const { content, dateUpdated } = req.body;
    try {
        const branch = yield branchSchema_1.default.findOneAndUpdate({ uid: branchId, chapterId }, { content: content, dateUpdated: dateUpdated }, { new: true });
        res.status(200).json(branch);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
exports.updateBranch = updateBranch;
const deleteBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId, branchId } = req.params;
    try {
        yield branchSchema_1.default.findOneAndDelete({
            uid: branchId,
            chapterId,
        });
        res.status(200).json({ message: "Branch deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.deleteBranch = deleteBranch;
//# sourceMappingURL=cBranches.js.map