import express from "express";
import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// config dotenv to allow user to use environment variables
dotenv.config();

// support parsing of application/json type post data
app.use(express.json({ limit: "30mb", extended: true }));

// support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// support cross origin requests
app.use(cors());

// show what happens when you go to server url
app.get("/", (req, res) => {
  res.send("Writality API");
});

// connect to server
const PORT = process.env.PORT || 5000;

// connect to database MongoDB
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
