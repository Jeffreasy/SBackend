"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registrerenController_1 = require("../../api/controllers/authenticatie/registrerenController");
const inloggenController_1 = require("../../api/controllers/authenticatie/inloggenController");
const router = (0, express_1.Router)();
router.post('/registreren', registrerenController_1.registreerGebruiker);
router.post('/inloggen', inloggenController_1.loginGebruiker);
exports.default = router;
