"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const projects_1 = __importDefault(require("./routes/projects"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
// configure dotenv
dotenv_1.default.config();
// support parsing of application/json type post data
app.use(express_1.default.json({ limit: "30mb" }));
// support parsing of application/x-www-form-urlencoded post data
app.use(express_1.default.urlencoded({ limit: "30mb", extended: true }));
// configure cors
app.use((0, cors_1.default)());
// Routes for the API
app.use("/projects", projects_1.default);
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Connected to server!");
});
const PORT = process.env.PORT || 5000;
// tslint:disable-next-line: no-console
console.log(process.env.CONNECTION_URL);
// tslint:disable-next-line: no-console
console.log(process.env.PORT);
// start the Express server and connect to the database
mongoose_1.default
    .connect(process.env.CONNECTION_URL)
    .then(() => 
// disable tslint for this line
// tslint:disable-next-line: no-console
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    // tslint:disable-next-line: no-console
    .catch((error) => console.log(error.message));
//# sourceMappingURL=index.js.map