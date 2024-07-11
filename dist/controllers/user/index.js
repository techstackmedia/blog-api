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
exports.listUsers = exports.getMe = exports.getUserById = void 0;
const User_1 = __importDefault(require("../../models/User"));
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Request Params:', req.params);
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error getting user by ID:', error.message);
        }
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getUserById = getUserById;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('Authenticated User:', req.user);
        const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error getting authenticated user:', error.message);
        }
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getMe = getMe;
const listUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error listing users:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
});
exports.listUsers = listUsers;
