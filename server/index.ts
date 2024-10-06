import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";

import { initPusher } from "./src/pusherProvider";

const cookieParser = require("cookie-parser");
const compression = require("compression");

const app = express() as express.Application;
const server = http.createServer(app);
mongoose.set("strictQuery", true);

// configure dotenv
dotenv.config();

// support parsing of application/json type post data
app.use(express.json({ limit: "3mb" }));
// support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ limit: "3mb", extended: true }));
app.use(cookieParser());
app.use(
  compression({
    level: 6,
  })
);

// configure cors
app.use(
  cors({
    origin: [process.env.PLATFORM_URL],
    credentials: true,
  })
);

// Routes for the API
// app.use("/users", users);
// app.use("/chats", chats);
// app.use("/posts", posts);

// app.use("/projects", projects);
// app.use("/chapters", chapters);
// app.use("/versions", versions);
// app.use("/branches", branches);

// app.use("/analytics", analytics);
// app.use("/notifications", notification);

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Connected to server!");
});

export const pusher = initPusher();

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

export default app;
