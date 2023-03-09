"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    postTitle: {
        type: String,
        required: true,
    },
    projectTitle: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
        required: true,
    },
    postType: {
        type: String,
        required: true,
    },
    collaboration: {
        type: String,
        required: true,
    },
    likes: {
        type: [
            {
                user: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    comments: {
        type: [
            {
                uid: {
                    type: String,
                    required: true,
                },
                owner: {
                    type: String,
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
                likes: {
                    type: Number,
                    required: true,
                },
                dateCreated: {
                    type: Date,
                    required: true,
                },
                required: false,
            },
        ],
        required: true,
    },
    collaborationType: {
        type: String,
        required: true,
    },
});
const Posts = (0, mongoose_1.model)("Post", postSchema);
exports.default = Posts;
//# sourceMappingURL=postSchema.js.map