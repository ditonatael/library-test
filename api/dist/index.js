"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 8000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send({
        message: "success",
    });
});
app.use(routers_1.default);
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const statusMessage = err.message || "Error";
    res.status(statusCode).send({
        error: true,
        message: statusMessage,
        data: null,
    });
});
module.exports = app.listen(port, () => {
    console.log(`⚡[server]: Server is running at http://localhost:${port}`);
});
