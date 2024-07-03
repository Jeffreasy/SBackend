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
exports.createDeelnemer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const db = mongoose_1.default.connection.useDb('mydatabase'); // Vervang 'mydatabase' door de naam van je database
const deelnemersCollection = db.collection('deelnemers');
// POST /api/v1/deelnemers
const createDeelnemer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newDeelnemer = req.body;
    try {
        const result = yield deelnemersCollection.insertOne(newDeelnemer);
        const createdDeelnemer = yield deelnemersCollection.findOne({
            _id: result.insertedId,
        });
        res.status(201).json(createdDeelnemer);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createDeelnemer = createDeelnemer;
