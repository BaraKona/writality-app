import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import socketIo from "socket.io";
import { Server } from "socket.io";

import projects from "./routes/projects";
import users from "./routes/users";
import chapters from "./routes/chapters";
import versions from "./routes/versions";
import branches from "./routes/branches";
import collaborations from "./routes/collabProject";
import collabChapters from "./routes/collabChapters";

const app = express();
const server = http.createServer(app);

// TODO: add cors options
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
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
app.use("/projects", projects);
app.use("/users", users);
app.use("/chapters", chapters);
app.use("/versions", versions);
app.use("/branches", branches);
app.use("/collaborations", collaborations);
app.use("/collaboration-chapters", collabChapters);

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
    callback(
      "This is a collaborative project, and you have joined the collaboration 😃👍"
    );
  });
  socket.on("create-col-chapter", (room, chapter) => {
    socket.to(room).emit("create-col-chapter", chapter);
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
