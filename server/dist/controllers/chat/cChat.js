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
exports.commentOnChat = exports.getProjectChat = exports.createChat = void 0;
const chapterSchema_1 = __importDefault(require("../../models/chat/chapterSchema"));
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, projectId, comments } = req.body;
    const newChat = new chapterSchema_1.default({ uid, projectId, comments });
    try {
        yield newChat.save();
        res.status(201).json(newChat);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
});
exports.createChat = createChat;
const getProjectChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    try {
        const chat = yield chapterSchema_1.default.findOne({
            projectId,
        });
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getProjectChat = getProjectChat;
const commentOnChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    const { content, date, user, uid } = req.body;
    console.log(content, date, user, uid);
    try {
        const chat = yield chapterSchema_1.default.findOne({
            projectId,
        });
        chat.comments.push({ content, date, user, uid });
        console.log(chat);
        yield chat.save();
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.commentOnChat = commentOnChat;
//# sourceMappingURL=cChat.js.map