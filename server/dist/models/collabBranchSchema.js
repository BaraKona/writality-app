"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const collabBranchSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
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
});
const CollabBranch = (0, mongoose_1.model)("collaboration-branch", collabBranchSchema);
exports.default = CollabBranch;
//# sourceMappingURL=collabBranchSchema.js.map