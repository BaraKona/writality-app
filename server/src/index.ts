import express from "express";
import dotenv from "dotenv";
import projects from "./routes/projects";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
const port = 8080; // default port to listen

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

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Connected to server!");
});

const PORT = process.env.PORT || 5000;

// start the Express server and connect to the database
mongoose
  .connect(
    "mongodb+srv://writalityAuth:NEb6c42mFrFpUMtK@cluster0.iycjlxm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
