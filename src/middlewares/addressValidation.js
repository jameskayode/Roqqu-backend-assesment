"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddressExists = exports.checkExistingAddress = exports.validateAddressUpdate = exports.validateAddressInput = void 0;
const express_validator_1 = require("express-validator");
const addressModel_1 = require("../models/addressModel");
// Middleware to validate request body for address creation/update
exports.validateAddressInput = [
    (0, express_validator_1.check)('userId').isInt().withMessage('Valid userId is required'),
    (0, express_validator_1.check)('address').notEmpty().withMessage('Address cannot be empty'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
];
// Middleware to validate request body for address update
exports.validateAddressUpdate = [
    (0, express_validator_1.check)('address').notEmpty().withMessage('Address cannot be empty'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
];
// Middleware to check if the user already has an address
const checkExistingAddress = async (req, res, next) => {
    const userId = Number(req.body.userId || req.params.userID);
    try {
        const existingAddress = await (0, addressModel_1.getAddressByUserId)(userId);
        if (existingAddress) {
            res.status(400).json({ message: 'User already has an address' });
            return;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkExistingAddress = checkExistingAddress;
// Middleware to check if the address exists before updating
const validateAddressExists = async (req, res, next) => {
    const userId = Number(req.params.userID);
    try {
        const existingAddress = await (0, addressModel_1.getAddressByUserId)(userId);
        if (!existingAddress) {
            res.status(404).json({ message: 'Address not found' });
            return;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateAddressExists = validateAddressExists;
