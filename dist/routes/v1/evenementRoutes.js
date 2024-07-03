"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtAuthMiddleware_1 = require("../../middlewares/authenticatie/jwtAuthMiddleware");
const evenementController_1 = require("../../api/controllers/evenement/evenementController");
const router = (0, express_1.Router)();
router.post('/evenementen', jwtAuthMiddleware_1.jwtAuthMiddleware, evenementController_1.maakEvenement);
router.get('/evenementen', jwtAuthMiddleware_1.jwtAuthMiddleware, evenementController_1.haalEvenementen);
exports.default = router;
