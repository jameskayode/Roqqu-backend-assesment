"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressController = exports.createAddressController = exports.getAddressController = void 0;
const addressModel_1 = require("../models/addressModel");
// GET /address/:userID - Get a user's address
const getAddressController = async (req, res) => {
    const { userID } = req.params;
    const address = await (0, addressModel_1.getAddressByUserId)(Number(userID));
    if (!address) {
        return res.status(404).json({ message: 'No address found for this user' });
    }
    res.status(200).json({ status: 'success', data: address });
};
exports.getAddressController = getAddressController;
// POST /address - Create a new address
const createAddressController = async (req, res) => {
    const { userId, address } = req.body;
    await (0, addressModel_1.createAddress)({ userId, address });
    res.status(201).json({ message: 'Address created successfully' });
};
exports.createAddressController = createAddressController;
// PUT /address/:userID - Update address
const updateAddressController = async (req, res) => {
    try {
        const { userID } = req.params;
        const { address } = req.body;
        if (!address) {
            return res.status(400).json({ message: 'Address field is required' });
        }
        const updatedRows = await (0, addressModel_1.updateAddress)(Number(userID), address);
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'No address found for this user' });
        }
        res.status(200).json({ message: 'Address updated successfully' });
    }
    catch (error) {
        console.error('Update address error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.updateAddressController = updateAddressController;
