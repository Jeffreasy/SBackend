"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticatieRoutes_1 = __importDefault(require("./v1/authenticatieRoutes"));
const beveiligdRoutes_1 = __importDefault(require("./v1/beveiligdRoutes"));
const deelnemerRoutes_1 = __importDefault(require("./v1/deelnemerRoutes"));
const donatieRoutes_1 = __importDefault(require("./v1/donatieRoutes"));
const evenementRoutes_1 = __importDefault(require("./v1/evenementRoutes"));
const vrijwilligerRoutes_1 = __importDefault(require("./v1/vrijwilligerRoutes"));
const router = (0, express_1.Router)();
router.use('/authenticatie', authenticatieRoutes_1.default);
router.use('/beveiligd', beveiligdRoutes_1.default);
router.use('/deelnemers', deelnemerRoutes_1.default);
router.use('/donaties', donatieRoutes_1.default);
router.use('/evenementen', evenementRoutes_1.default);
router.use('/vrijwilligers', vrijwilligerRoutes_1.default);
exports.default = router;
