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
exports.registerAndLogin = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const gebruikerModel_1 = __importDefault(require("../infrastructuur/database/modellen/gebruikerModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let mongoServer;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    yield mongoose_1.default.connect(mongoUri);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
    yield mongoServer.stop();
}));
const registerAndLogin = () => __awaiter(void 0, void 0, void 0, function* () {
    const wachtwoord = 'wachtwoord123';
    const hashedPassword = yield bcryptjs_1.default.hash(wachtwoord, 10);
    const user = yield gebruikerModel_1.default.create({
        naam: 'Test Gebruiker',
        email: 'test@example.com',
        wachtwoord: hashedPassword,
        rol: 'donateur',
    });
    const res = yield (0, supertest_1.default)(app_1.default)
        .post('/api/v1/authenticatie/inloggen')
        .send({
        email: user.email,
        wachtwoord: wachtwoord,
    });
    return res.body.token;
});
exports.registerAndLogin = registerAndLogin;
