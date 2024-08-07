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
exports.registreerGebruiker = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const gebruikerModel_1 = __importDefault(require("../../../infrastructuur/database/modellen/gebruikerModel"));
const registreerGebruiker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { naam, email, wachtwoord } = req.body;
    try {
        const gebruikerBestaat = yield gebruikerModel_1.default.findOne({ email });
        if (gebruikerBestaat) {
            return res.status(400).json({ message: 'Gebruiker bestaat al' });
        }
        const zout = yield bcryptjs_1.default.genSalt(10);
        const gehashtWachtwoord = yield bcryptjs_1.default.hash(wachtwoord, zout);
        const gebruiker = yield gebruikerModel_1.default.create({
            naam,
            email,
            wachtwoord: gehashtWachtwoord,
        });
        const token = jsonwebtoken_1.default.sign({ id: gebruiker._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1h',
        });
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.registreerGebruiker = registreerGebruiker;
