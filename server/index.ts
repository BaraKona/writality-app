import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

import users from "./src/routes/users";
import chats from "./src/routes/chat/chat";
import posts from "./src/routes/posts";

import projects from "./src/routes/project/projects";
import chapters from "./src/routes/project/chapters";
import versions from "./src/routes/project/versions";
import branches from "./src/routes/project/branches";

import collaborations from "./src/routes/collaboration/collabProject";
import collabChapters from "./src/routes/collaboration/collabChapters";
import collabVersions from "./src/routes/collaboration/collabVersions";
import collabBranches from "./src/routes/collaboration/collabBranches";

const app = express() as express.Application;
const server = http.createServer(app);

// TODO: add cors options
const io = new Server(server, {
	cors: {
		origin: [process.env.URL],
	},
});

// configure dotenv
dotenv.config();
// support parsing of application/json type post data
app.use(express.json({ limit: "30mb" }));
// support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// configure cors
app.use(cors());

// Routes for the API
app.use("/users", users);
app.use("/chats", chats);
app.use("/posts", posts);

app.use("/projects", projects);
app.use("/chapters", chapters);
app.use("/versions", versions);
app.use("/branches", branches);

app.use("/collaborations", collaborations);
app.use("/collaboration-chapters", collabChapters);
app.use("/collaboration-versions", collabVersions);
app.use("/collaboration-branches", collabBranches);

// define a route handler for the default home page
app.get("/", (req, res) => {
	res.send("Connected to server!");
});

io.on("connection", (socket) => {
	socket.on("join-collaboration", (room, callback) => {
		socket.join(room);
		callback(
			"This is a collaborative project, and you have joined the collaboration 😃👍"
		);
	});
	socket.on("disconnect", () => {
		console.log("user disconnected");
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
mongoose
	.connect(process.env.CONNECTION_URL)
	.then(() =>
		// disable tslint for this line
		// tslint:disable-next-line: no-console
		server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	)
	// tslint:disable-next-line: no-console
	.catch((error) => console.log(error.message));