"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.haalEvenementen = exports.maakEvenement = void 0;
const evenementModel_1 = __importDefault(require("../../../infrastructuur/database/modellen/evenementModel"));
const maakEvenement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { naam, datum, locatie } = req.body;
        const nieuwEvenement = new evenementModel_1.default({ naam, datum, locatie });
        yield nieuwEvenement.save();
        res.status(201).json(nieuwEvenement);
    }
    catch (error) {
        res.status(500).json({ message: 'Fout bij het maken van evenement', error });
    }
});
exports.maakEvenement = maakEvenement;
const haalEvenementen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evenementen = yield evenementModel_1.default.find();
        res.status(200).json(evenementen);
    }
    catch (error) {
        res.status(500).json({ message: 'Fout bij het ophalen van evenementen', error });
    }
});
exports.haalEvenementen = haalEvenementen;
