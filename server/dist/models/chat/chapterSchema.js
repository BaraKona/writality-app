"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    uid: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        required: true,
    },
    comments: [
        {
            uid: {
                type: String,
                required: true,
            },
            user: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
        },
    ],
});
exports.default = (0, mongoose_1.model)("collaboration-chat", chatSchema);
//# sourceMappingURL=chapterSchema.js.map