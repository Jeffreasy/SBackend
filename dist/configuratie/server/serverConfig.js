"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../database/database"));
const routes_1 = __importDefault(require("../../routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Verbind met MongoDB
(0, database_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/v1', routes_1.default);
app.listen(port, () => {
    console.log(`Server draait op poort ${port}`);
});
exports.default = app;
