"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = (0, knex_1.default)({
    client: 'sqlite3',
    connection: {
        filename: './database.sqlite',
    },
    useNullAsDefault: true,
});
exports.default = db;
