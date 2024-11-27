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
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.create({
            email,
            password
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});
exports.login = login;
