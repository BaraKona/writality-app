"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const collabProjectSchema = new mongoose_1.Schema({
    uid: {
        type: String,
        required: true,
    },
    title: {
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
    owner: {
        type: String,
        required: true,
    },
    collaborators: [
        {
            user: {
                type: String,
                required: true,
            },
            dateJoined: {
                type: Date,
                required: true,
            },
        },
    ],
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)("collaboration-projects", collabProjectSchema);
//# sourceMappingURL=collabProjectSchema.js.map