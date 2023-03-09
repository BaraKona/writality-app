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
exports.getAllUsers = exports.getUser = exports.createUser = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bcrypt = require("bcrypt");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, uid } = req.body;
    const newUser = new userSchema_1.default({
        name,
        email,
        uid,
    });
    // check if user already exists
    const user = yield userSchema_1.default.findOne({
        email: email,
    });
    if (user) {
        return res.status(409).json({ message: "User already exists" });
    }
    try {
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(409).json({
            message: "Something went wrong, we could not get you registered",
        });
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userSchema_1.default.findOne({ uid: id });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getUser = getUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userSchema_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=cUser.js.map