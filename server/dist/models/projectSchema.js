"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    uid: { type: String, required: true },
    owner: { type: String, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    dateCreated: {
        user: { type: String, required: true },
        date: { type: Date, required: true },
    },
    dateUpdated: {
        user: { type: String, required: false },
        date: { type: Date, required: false },
    },
});
const Project = (0, mongoose_1.model)("Project", projectSchema);
exports.default = Project;
//# sourceMappingURL=projectSchema.js.map