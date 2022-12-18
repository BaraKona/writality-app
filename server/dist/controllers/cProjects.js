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
exports.getProject = exports.getAllProjects = exports.getUserProjects = exports.createProject = void 0;
const projectSchema_1 = __importDefault(require("../models/projectSchema"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, uid, owner, title, description, dateCreated } = req.body;
    const newProject = new projectSchema_1.default({
        type,
        uid,
        owner,
        title,
        description,
        dateCreated,
    });
    try {
        yield newProject.save();
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
});
exports.createProject = createProject;
const getUserProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        const projects = yield projectSchema_1.default.find({ owner: uid });
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getUserProjects = getUserProjects;
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projectSchema_1.default.find();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAllProjects = getAllProjects;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        const project = yield projectSchema_1.default.findOne({ uid });
        res.status(200).json(project);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getProject = getProject;
//# sourceMappingURL=cProjects.js.map