"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getPostById = exports.createPost = exports.getPostsByUser = void 0;
const database_1 = __importDefault(require("../config/database"));
const getPostsByUser = async (userId) => {
    return (0, database_1.default)('posts').select('*').where({ userId });
};
exports.getPostsByUser = getPostsByUser;
const createPost = async (post) => {
    return (0, database_1.default)('posts').insert(post);
};
exports.createPost = createPost;
const getPostById = async (id) => {
    return (0, database_1.default)('posts').where({ id }).first();
};
exports.getPostById = getPostById;
const deletePost = async (id) => {
    return (0, database_1.default)('posts').where({ id }).del();
};
exports.deletePost = deletePost;
