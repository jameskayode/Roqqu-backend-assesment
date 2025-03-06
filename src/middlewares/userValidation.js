"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserId = exports.validatePagination = exports.validateCreateUser = void 0;
const express_validator_1 = require("express-validator");
const database_1 = __importDefault(require("../config/database"));
// Middleware to validate user creation
exports.validateCreateUser = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Valid email is required'),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        try {
            const existingUser = await (0, database_1.default)('users').where('email', req.body.email).first();
            if (existingUser) {
                res.status(400).json({ error: 'Email already exists' });
                return;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
];
// Middleware to validate pagination parameters
const validatePagination = (req, res, next) => {
    const page = Number(req.query.pageNumber) || 1;
    const size = Number(req.query.pageSize) || 10;
    if (page < 1) {
        res.status(400).json({ message: 'Page number must start from 1' });
        return;
    }
    req.query.pageNumber = String(page);
    req.query.pageSize = String(size);
    next();
};
exports.validatePagination = validatePagination;
// Middleware to validate user ID
const validateUserId = async (req, res, next) => {
    try {
        const user = await (0, database_1.default)('users').where('id', req.params.id).first();
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateUserId = validateUserId;
