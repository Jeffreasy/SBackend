"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtAuthMiddleware_1 = require("../../middlewares/authenticatie/jwtAuthMiddleware");
const beveiligdController_1 = require("../../api/controllers/beveiligd/beveiligdController");
const router = (0, express_1.Router)();
router.get('/beveiligd_endpoint', jwtAuthMiddleware_1.jwtAuthMiddleware, beveiligdController_1.beveiligdEndpoint);
exports.default = router;
