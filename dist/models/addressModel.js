"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddress = exports.createAddress = exports.getAddressByUserId = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAddressByUserId = async (userId) => (0, database_1.default)('addresses').where({ userId }).first();
exports.getAddressByUserId = getAddressByUserId;
const createAddress = async (address) => (0, database_1.default)('addresses').insert(address);
exports.createAddress = createAddress;
const updateAddress = async (userId, newAddress) => {
    const updated = await (0, database_1.default)('addresses')
        .where({ userId })
        .update({ address: newAddress });
    return updated;
};
exports.updateAddress = updateAddress;
