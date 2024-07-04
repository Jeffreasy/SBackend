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
const test_utils_1 = require("./test-utils");
const app_1 = __importDefault(require("../app"));
describe('Donatie Endpoints', () => {
    let token;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        token = yield (0, test_utils_1.registerAndLogin)();
    }));
    describe('POST /api/v1/donaties', () => {
        it('zou een nieuwe donatie moeten aanmaken', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default)
                .post('/api/v1/donaties')
                .set('Authorization', `Bearer ${token}`)
                .send({
                bedrag: 50,
                donateurNaam: 'Test Donateur',
                bericht: 'Test bericht',
            });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.bedrag).toBe(50);
        }));
        // ... (meer tests voor validatie, autorisatie, etc.)
    });
    describe('GET /api/v1/donaties', () => {
        it('zou alle donaties moeten ophalen', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default)
                .get('/api/v1/donaties')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        }));
    });
});
