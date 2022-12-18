"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const projects_1 = __importDefault(require("./routes/projects"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8080; // default port to listen
// configure dotenv
dotenv_1.default.config();
// support parsing of application/json type post data
app.use(express_1.default.json({ limit: "30mb" }));
// support parsing of application/x-www-form-urlencoded post data
app.use(express_1.default.urlencoded({ limit: "30mb", extended: true }));
// configure cors
app.use((0, cors_1.default)());
// Routes for the API
app.use("projects", projects_1.default);
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Connected to server!");
});
const PORT = process.env.PORT || 5000;
// start the Express server
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map