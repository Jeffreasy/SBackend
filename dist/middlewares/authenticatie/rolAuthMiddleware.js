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
exports.checkRole = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const gebruikerModel_1 = __importDefault(require("../../infrastructuur/database/modellen/gebruikerModel"));
const mongoose_1 = require("mongoose");
function isObjectIdString(id) {
    return typeof id === 'string' && mongoose_1.Types.ObjectId.isValid(id);
}
const checkRole = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                return res.status(401).send({ error: 'Geen token, autorisatie geweigerd' });
            }
            const gebruiker = yield gebruikerModel_1.default.findById(req.user.id).exec();
            if (!gebruiker || !roles.includes(gebruiker.rol)) {
                return res.status(403).send({ error: 'Toegang geweigerd' });
            }
            req.user = gebruiker.toObject(); // Toewijzen van de hele gebruiker (zonder Mongoose-specifieke methoden)
            next();
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                return res.status(401).send({ error: 'Token expired' });
            }
            else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                return res.status(401).send({ error: 'Invalid token' });
            }
            res.status(401).send({ error: 'Niet geautoriseerd' });
        }
    });
};
exports.checkRole = checkRole;
