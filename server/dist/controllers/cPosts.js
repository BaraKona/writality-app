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
exports.createPost = exports.getPosts = void 0;
const postSchema_1 = __importDefault(require("../models/postSchema"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postSchema_1.default.find({
            limit: 25,
        });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getPosts = getPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { owner, postTitle, projectTitle, description, genres, postType, likes, dateCreated, comments, collaborationType, collaboration, } = req.body;
    const newPost = new postSchema_1.default({
        owner,
        postTitle,
        projectTitle,
        description,
        genres,
        postType,
        likes,
        dateCreated,
        comments,
        collaborationType,
        collaboration,
    });
    try {
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(409).json({
            message: "Something went wrong, we could not get create your post",
        });
    }
});
exports.createPost = createPost;
//# sourceMappingURL=cPosts.js.map