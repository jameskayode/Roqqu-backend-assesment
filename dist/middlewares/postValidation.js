"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostId = exports.validatePostExists = exports.validateCreatePost = exports.validateGetPosts = void 0;
const express_validator_1 = require("express-validator");
const database_1 = __importDefault(require("../config/database"));
const userModel_1 = require("../models/userModel");
const postModel_1 = require("../models/postModel");
// Middleware to validate GET /posts query parameters
exports.validateGetPosts = [
    (0, express_validator_1.check)('userId').notEmpty().withMessage('User ID is required').isInt().withMessage('User ID must be an integer'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        return next();
    }
];
// Middleware to validate POST /posts request body
exports.validateCreatePost = [
    (0, express_validator_1.check)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.check)('body').notEmpty().withMessage('Body is required'),
    (0, express_validator_1.check)('userId').isInt().withMessage('Valid User ID is required'),
    async (req, res, next) => {
        const { title, body, userId } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        try {
            const user = await (0, userModel_1.getUserById)(Number(userId));
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const existingPost = await (0, database_1.default)('posts').where({ title, body, userId }).first();
            if (existingPost) {
                res.status(400).json({ message: 'A post with the same title and body already exists for this user' });
                return;
            }
            return next();
        }
        catch (error) {
            return next(error);
        }
    }
];
const validatePostExists = async (req, res, next) => {
    const postId = Number(req.params.id);
    try {
        const post = await (0, postModel_1.getPostById)(postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return; // ✅ Ensure function exits
        }
        return next();
    }
    catch (error) {
        return next(error); // ✅ Correct error passing
    }
};
exports.validatePostExists = validatePostExists;
exports.validatePostId = [
    (0, express_validator_1.check)('id').isInt().withMessage('Invalid post ID'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
