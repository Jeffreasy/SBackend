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
exports.haalVrijwilligersOp = exports.registreerVrijwilliger = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const vrijwilligerModel_1 = __importDefault(require("../../../infrastructuur/database/modellen/vrijwilligerModel"));
const registreerVrijwilliger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Ontvangen in controller:', JSON.stringify(req.body, null, 2));
    try {
        const { naam, email, telefoonnummer } = req.body;
        console.log('Geëxtraheerde velden:', { naam, email, telefoonnummer });
        // Log de types van de velden
        console.log('Types van velden:', {
            naam: typeof naam,
            email: typeof email,
            telefoonnummer: typeof telefoonnummer
        });
        // Controleer of alle vereiste velden aanwezig zijn
        if (!naam || !email || !telefoonnummer) {
            throw new Error('Naam, email en telefoonnummer zijn verplicht');
        }
        console.log('Vóór het aanmaken van nieuwe Vrijwilliger:', { naam, email, telefoonnummer });
        const nieuweVrijwilliger = new vrijwilligerModel_1.default({ naam, email, telefoonnummer });
        console.log('Na het aanmaken van nieuwe Vrijwilliger:', nieuweVrijwilliger.toObject());
        const opgeslagenVrijwilliger = yield nieuweVrijwilliger.save();
        console.log('Vrijwilliger opgeslagen:', opgeslagenVrijwilliger.toObject());
        res.status(201).json(opgeslagenVrijwilliger);
    }
    catch (fout) {
        console.error('Fout in registreerVrijwilliger:', fout);
        if (fout instanceof mongoose_1.default.Error.ValidationError) {
            console.log('Validatiefout details:', fout.errors);
            res.status(400).json({ bericht: 'Validatiefout', fout: fout.message, details: fout.errors });
        }
        else if (fout instanceof mongoose_1.default.Error && 'code' in fout && fout.code === 11000) {
            res.status(409).json({ bericht: 'Een vrijwilliger met dit e-mailadres bestaat al', fout: fout.message });
        }
        else {
            console.error('Onverwachte fout:', fout);
            res.status(500).json({ bericht: 'Fout bij het registreren van vrijwilliger', fout: fout instanceof Error ? fout.message : String(fout) });
        }
    }
});
exports.registreerVrijwilliger = registreerVrijwilliger;
const haalVrijwilligersOp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vrijwilligers = yield vrijwilligerModel_1.default.find();
        res.status(200).json(vrijwilligers);
    }
    catch (fout) {
        console.error('Fout bij het ophalen van vrijwilligers:', fout);
        res.status(500).json({ bericht: 'Fout bij het ophalen van vrijwilligers', fout: fout instanceof Error ? fout.message : String(fout) });
    }
});
exports.haalVrijwilligersOp = haalVrijwilligersOp;
