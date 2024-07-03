"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maakDeelnemerController_1 = require("../../api/controllers/deelnemer/maakDeelnemerController");
const router = (0, express_1.Router)();
router.post('/', maakDeelnemerController_1.createDeelnemer);
exports.default = router;
