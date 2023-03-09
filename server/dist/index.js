"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const users_1 = __importDefault(require("./routes/users"));
const chat_1 = __importDefault(require("./routes/chat/chat"));
const posts_1 = __importDefault(require("./routes/posts"));
const projects_1 = __importDefault(require("./routes/project/projects"));
const chapters_1 = __importDefault(require("./routes/project/chapters"));
const versions_1 = __importDefault(require("./routes/project/versions"));
const branches_1 = __importDefault(require("./routes/project/branches"));
const collabProject_1 = __importDefault(require("./routes/collaboration/collabProject"));
const collabChapters_1 = __importDefault(require("./routes/collaboration/collabChapters"));
const collabVersions_1 = __importDefault(require("./routes/collaboration/collabVersions"));
const collabBranches_1 = __importDefault(require("./routes/collaboration/collabBranches"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// TODO: add cors options
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [process.env.URL],
    },
});
// configure dotenv
dotenv_1.default.config();
// support parsing of application/json type post data
app.use(express_1.default.json({ limit: "30mb" }));
// support parsing of application/x-www-form-urlencoded post data
app.use(express_1.default.urlencoded({ limit: "30mb", extended: true }));
// configure cors
app.use((0, cors_1.default)());
// Routes for the API
app.use("/users", users_1.default);
app.use("/chats", chat_1.default);
app.use("/posts", posts_1.default);
app.use("/projects", projects_1.default);
app.use("/chapters", chapters_1.default);
app.use("/versions", versions_1.default);
app.use("/branches", branches_1.default);
app.use("/collaborations", collabProject_1.default);
app.use("/collaboration-chapters", collabChapters_1.default);
app.use("/collaboration-versions", collabVersions_1.default);
app.use("/collaboration-branches", collabBranches_1.default);
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Connected to server!");
});
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("join-collaboration", (room, callback) => {
        socket.join(room);
        callback("This is a collaborative project, and you have joined the collaboration 😃👍");
    });
    socket.on("join-chapter", (room, callback) => {
        socket.join(room);
    });
    socket.on("save", (room, content) => {
        socket.to(room).emit("save", content);
    });
    socket.on("update-col-desc", (room, desc) => {
        socket.to(room).emit("update-col-desc", desc);
    });
    socket.on("create-col-chapter", (room, chapter) => {
        socket.to(room).emit("create-col-chapter", chapter);
    });
    socket.on("delete-col-chapter", (room, chapter) => {
        socket.to(room).emit("delete-col-chapter", chapter);
    });
    socket.on("create-col-version", (room, version) => {
        socket.to(room).emit("create-col-version", version);
    });
    socket.on("create-col-branch", (room, branch) => {
        socket.to(room).emit("create-col-branch", branch);
    });
    socket.on("update-col-branch", (room, name) => {
        socket.to(room).emit("update-col-branch", name);
    });
    socket.on("delete-col-branch", (room, name) => {
        socket.to(room).emit("delete-col-branch", name);
    });
    socket.on("delete-col-version", (room, version) => {
        socket.to(room).emit("delete-col-version", version);
    });
    socket.on("comment-col-chat", (room, comment) => {
        socket.to(room).emit("comment-col-chat", comment);
    });
    socket.on("merge-col-branch", (room, branchName) => {
        socket.to(room).emit("merge-col-branch", branchName);
    });
});
const PORT = process.env.PORT || 5000;
// start the Express server and connect to the database
mongoose_1.default
    .connect(process.env.CONNECTION_URL)
    .then(() => 
// disable tslint for this line
// tslint:disable-next-line: no-console
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    // tslint:disable-next-line: no-console
    .catch((error) => console.log(error.message));
//# sourceMappingURL=index.js.map