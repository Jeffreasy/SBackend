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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const gebruikerModel_1 = __importDefault(require("../infrastructuur/database/modellen/gebruikerModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
describe('Authenticatie Endpoints', () => {
    // Voordat alle tests beginnen, maak verbinding met de testdatabase
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/testdb');
    }));
    // Na alle tests, sluit de databaseverbinding
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    describe('POST /api/v1/authenticatie/registreren', () => {
        it('zou een nieuwe gebruiker moeten registreren', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default)
                .post('/api/v1/authenticatie/registreren')
                .send({
                naam: 'Test Gebruiker',
                email: 'test@example.com',
                wachtwoord: 'wachtwoord123',
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            // Controleer of de gebruiker is opgeslagen in de database
            const gebruiker = yield gebruikerModel_1.default.findOne({ email: 'test@example.com' });
            expect(gebruiker).toBeTruthy();
            expect(yield bcryptjs_1.default.compare('wachtwoord123', gebruiker.wachtwoord)).toBe(true);
        }));
        it('zou geen gebruiker moeten registreren met een bestaand e-mailadres', () => __awaiter(void 0, void 0, void 0, function* () {
            yield gebruikerModel_1.default.create({
                naam: 'Bestaande Gebruiker',
                email: 'bestaande@example.com',
                wachtwoord: 'wachtwoord123',
            });
            const res = yield (0, supertest_1.default)(app_1.default)
                .post('/api/v1/authenticatie/registreren')
                .send({
                naam: 'Nieuwe Gebruiker',
                email: 'bestaande@example.com',
                wachtwoord: 'wachtwoord123',
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Email already exists');
        }));
    });
    describe('POST /api/v1/authenticatie/inloggen', () => {
        it('zou een bestaande gebruiker moeten inloggen', () => __awaiter(void 0, void 0, void 0, function* () {
            yield gebruikerModel_1.default.create({
                naam: 'Test Gebruiker',
                email: 'test@example.com',
                wachtwoord: yield bcryptjs_1.default.hash('wachtwoord123', 10),
            });
            const res = yield (0, supertest_1.default)(app_1.default)
                .post('/api/v1/authenticatie/inloggen')
                .send({
                email: 'test@example.com',
                wachtwoord: 'wachtwoord123',
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
        }));
        it('zou niet moeten inloggen met onjuiste inloggegevens', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default)
                .post('/api/v1/authenticatie/inloggen')
                .send({
                email: 'test@example.com',
                wachtwoord: 'verkeerdwachtwoord',
            });
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Invalid credentials');
        }));
    });
});
