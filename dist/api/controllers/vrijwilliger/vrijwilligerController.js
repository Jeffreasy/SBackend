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
exports.haalVrijwilligers = exports.registreerVrijwilliger = void 0;
const vrijwilligerModel_1 = __importDefault(require("../../../infrastructuur/database/modellen/vrijwilligerModel"));
const registreerVrijwilliger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { naam, email } = req.body;
        const nieuweVrijwilliger = new vrijwilligerModel_1.default({ naam, email });
        yield nieuweVrijwilliger.save();
        res.status(201).json(nieuweVrijwilliger);
    }
    catch (error) {
        res.status(500).json({ message: 'Fout bij het registreren van vrijwilliger', error });
    }
});
exports.registreerVrijwilliger = registreerVrijwilliger;
const haalVrijwilligers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vrijwilligers = yield vrijwilligerModel_1.default.find();
        res.status(200).json(vrijwilligers);
    }
    catch (error) {
        res.status(500).json({ message: 'Fout bij het ophalen van vrijwilligers', error });
    }
});
exports.haalVrijwilligers = haalVrijwilligers;
