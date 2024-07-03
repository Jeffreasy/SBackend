"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const maakDonatieController_1 = require("../../api/controllers/donatie/maakDonatieController");
const haalDonatiesController_1 = require("../../api/controllers/donatie/haalDonatiesController");
const jwtAuthMiddleware_1 = require("../../middlewares/authenticatie/jwtAuthMiddleware");
const rolAuthMiddleware_1 = require("../../middlewares/authenticatie/rolAuthMiddleware");
const router = express_1.default.Router();
router.post('/donaties', jwtAuthMiddleware_1.jwtAuthMiddleware, (0, rolAuthMiddleware_1.checkRole)(['admin', 'donateur']), maakDonatieController_1.maakDonatie);
router.get('/donaties', jwtAuthMiddleware_1.jwtAuthMiddleware, (0, rolAuthMiddleware_1.checkRole)(['admin']), haalDonatiesController_1.haalDonaties);
exports.default = router;
