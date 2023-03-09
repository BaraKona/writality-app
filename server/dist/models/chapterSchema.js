"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chapterSchema = new mongoose_1.Schema({
    owner: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    dateCreated: {
        user: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    dateUpdated: {
        user: {
            type: String,
            required: false,
        },
        date: {
            type: Date,
            required: false,
        },
    },
    history: [
        {
            date: {
                type: Date,
                required: true,
            },
            user: {
                type: String,
                required: true,
            },
            action: {
                type: String,
                required: true,
            },
        },
    ],
    content: {
        type: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        uid: {
            type: String,
            required: true,
        },
        dateCreated: {
            user: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
        },
        dateUpdated: {
            user: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
        },
        projectId: {
            type: String,
            required: true,
        },
        chapterId: {
            type: String,
            required: true,
        },
    },
});
exports.default = (0, mongoose_1.model)("Chapter", chapterSchema);
//# sourceMappingURL=chapterSchema.js.map