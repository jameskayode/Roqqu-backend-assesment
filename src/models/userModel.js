"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getUsers = exports.getUsersCount = void 0;
const database_1 = __importDefault(require("../config/database"));
// Get Users Count (returns a number)
const getUsersCount = async () => {
    const result = await (0, database_1.default)('users').count('* as count').first();
    if (!result || !result.count) {
        return { count: 0 };
    }
    // Convert result.count to number explicitly
    return { count: parseInt(result.count, 10) };
};
exports.getUsersCount = getUsersCount;
const getUsers = (limit, offset) => (0, database_1.default)('users')
    .select('users.id as user_id', 'users.name', 'users.email', 'addresses.address')
    .leftJoin('addresses', 'users.id', '=', 'addresses.userId')
    .limit(limit)
    .offset(offset);
exports.getUsers = getUsers;
// Fetch a Single User by ID
const getUserById = async (id) => (0, database_1.default)('users')
    .select('users.id as user_id', 'users.name', 'users.email', 'addresses.address')
    .leftJoin('addresses', 'users.id', '=', 'addresses.userId')
    .where('users.id', id)
    .first();
exports.getUserById = getUserById;
// Create User
const createUser = async (user) => {
    if (database_1.default.client.config.client === 'pg') {
        return (0, database_1.default)('users').insert(user).returning('id');
    }
    return (0, database_1.default)('users').insert(user);
};
exports.createUser = createUser;
