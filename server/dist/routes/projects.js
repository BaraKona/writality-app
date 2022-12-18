"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cProjects_1 = require("../controllers/cProjects");
const router = express_1.default.Router();
router.post("/", cProjects_1.createProject);
exports.default = router;
//# sourceMappingURL=projects.js.map