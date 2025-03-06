"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = exports.getUserByIdController = exports.getUsersCountController = exports.getUsersController = void 0;
const userModel_1 = require("../models/userModel");
const database_1 = __importDefault(require("../config/database"));
// GET /users - Get all users with pagination
const getUsersController = async (req, res) => {
    const { pageNumber, pageSize } = req.query;
    const offset = (Number(pageNumber) - 1) * Number(pageSize);
    const users = await (0, userModel_1.getUsers)(Number(pageSize), offset);
    if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({
        status: "success",
        pageNumber,
        pageSize,
        totalUsers: users.length,
        data: users,
    });
};
exports.getUsersController = getUsersController;
// GET /users/count - Get total user count
const getUsersCountController = async (_req, res) => {
    const count = await (0, userModel_1.getUsersCount)();
    res.json({ count });
};
exports.getUsersCountController = getUsersCountController;
// GET /users/:id - Get a user by ID
const getUserByIdController = async (req, res) => {
    const user = await (0, userModel_1.getUserById)(Number(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
};
exports.getUserByIdController = getUserByIdController;
// POST /users - Create a new user
const createUserController = async (req, res) => {
    const { name, email } = req.body;
    const [userId] = await (0, database_1.default)('users').insert({ name, email }).returning('id');
    res.status(201).json({ message: 'User created successfully', userId });
};
exports.createUserController = createUserController;
