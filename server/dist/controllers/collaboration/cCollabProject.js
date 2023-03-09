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
exports.updateCollabTitle = exports.updateCollabDescription = exports.addCollaboratorToProject = exports.getSingleCollabProject = exports.getAllCollabProjectsByUserId = exports.createCollabProject = void 0;
const collabProjectSchema_1 = __importDefault(require("../../models/collabProjectSchema"));
const chapterSchema_1 = __importDefault(require("../../models/chat/chapterSchema"));
// @ts-ignore
const uuid_1 = require("uuid");
const createCollabProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, uid, dateCreated, owner, description, type } = req.body;
    const newCollabProject = new collabProjectSchema_1.default({
        owner,
        title,
        uid,
        dateCreated,
        description,
        type,
        collaborators: [
            {
                user: owner,
                dateJoined: dateCreated.date,
            },
        ],
    });
    const newChat = new chapterSchema_1.default({
        uid: (0, uuid_1.v4)(),
        projectId: uid,
        comments: [],
    });
    console.log(newCollabProject);
    console.log(newChat);
    try {
        yield newCollabProject.save();
        yield newChat.save();
        res.status(201).json(newCollabProject);
    }
    catch (error) {
        console.log(error.message);
        console.log(error);
        res.status(409).json({ message: error.message });
    }
});
exports.createCollabProject = createCollabProject;
const getAllCollabProjectsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const collabProjects = yield collabProjectSchema_1.default.find({
            $or: [
                { owner: userId },
                { collaborators: { $elemMatch: { user: userId } } },
            ],
        });
        res.status(200).json(collabProjects);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAllCollabProjectsByUserId = getAllCollabProjectsByUserId;
const getSingleCollabProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, projectId } = req.params;
    try {
        const collabProject = yield collabProjectSchema_1.default.findOne({
            $or: [
                { owner: userId },
                { collaborators: { $elemMatch: { user: userId } } },
            ],
            uid: projectId,
        });
        res.status(200).json(collabProject);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getSingleCollabProject = getSingleCollabProject;
const addCollaboratorToProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, projectId } = req.params;
    const { collaboratorId } = req.body;
    try {
        const collabProject = yield collabProjectSchema_1.default.findOne({
            owner: userId,
            uid: projectId,
        });
        collabProject.collaborators.push({
            user: collaboratorId,
            dateJoined: new Date(),
        });
        yield collabProject.save();
        res.status(200).json(collabProject);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.addCollaboratorToProject = addCollaboratorToProject;
const updateCollabDescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, projectId } = req.params;
    const { description } = req.body;
    try {
        const project = yield collabProjectSchema_1.default.findOne({
            owner: userId,
            uid: projectId,
        });
        project.description = description;
        yield project.save();
        res.status(200).json(project);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.updateCollabDescription = updateCollabDescription;
const updateCollabTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, projectId } = req.params;
    const { title } = req.body;
    try {
        const project = yield collabProjectSchema_1.default.findOne({
            owner: userId,
            uid: projectId,
        });
        project.title = title;
        yield project.save();
        res.status(200).json(project);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.updateCollabTitle = updateCollabTitle;
//# sourceMappingURL=cCollabProject.js.map