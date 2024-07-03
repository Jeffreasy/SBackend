"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtAuthMiddleware_1 = require("../../middlewares/authenticatie/jwtAuthMiddleware");
const vrijwilligerController_1 = require("../../api/controllers/vrijwilliger/vrijwilligerController");
const router = (0, express_1.Router)();
router.post('/vrijwilligers', jwtAuthMiddleware_1.jwtAuthMiddleware, vrijwilligerController_1.registreerVrijwilliger);
router.get('/vrijwilligers', jwtAuthMiddleware_1.jwtAuthMiddleware, vrijwilligerController_1.haalVrijwilligers);
exports.default = router;
