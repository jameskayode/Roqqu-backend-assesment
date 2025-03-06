"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const addressModel_1 = require("../models/addressModel");
jest.mock('../models/addressModel');
describe('Address API Endpoints', () => {
    /** GET /addresses/:userID - Fetch a user's address */
    describe('GET /addresses/:userID', () => {
        it('should return an address if found', async () => {
            addressModel_1.getAddressByUserId.mockResolvedValue({
                userId: 1,
                address: '123 Main St, New York',
            });
            // Send GET request
            const response = await (0, supertest_1.default)(server_1.default).get('/addresses/1');
            // Validate response
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data.userId).toBe(1);
            expect(response.body.data.address).toBe('123 Main St, New York');
        });
        it('should return 404 if no address is found', async () => {
            addressModel_1.getAddressByUserId.mockResolvedValue(null);
            const response = await (0, supertest_1.default)(server_1.default).get('/addresses/99');
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No address found for this user');
        });
    });
    /** POST /addresses - Create an address */
    describe('POST /addresses', () => {
        it('should create an address successfully', async () => {
            addressModel_1.getAddressByUserId.mockResolvedValue(null); // No existing address
            addressModel_1.createAddress.mockResolvedValue([{ id: 10 }]); // Mock address creation
            const response = await (0, supertest_1.default)(server_1.default)
                .post('/addresses')
                .send({
                userId: 5,
                address: '456 Elm St, San Francisco',
            });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Address created successfully');
        });
        it('should return 400 if user already has an address', async () => {
            addressModel_1.getAddressByUserId.mockResolvedValue({
                userId: 5,
                address: '123 Main St, New York',
            });
            const response = await (0, supertest_1.default)(server_1.default)
                .post('/addresses')
                .send({
                userId: 5,
                address: '456 Elm St, San Francisco',
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already has an address');
        });
        it('should return 400 for missing fields', async () => {
            const response = await (0, supertest_1.default)(server_1.default).post('/addresses').send({});
            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
        });
    });
    /** PATCH /addresses/:userID - Update an address */
    describe('PATCH /addresses/:userID', () => {
        it('should update an address successfully', async () => {
            addressModel_1.getAddressByUserId.mockResolvedValue({
                userId: 5,
                address: '123 Main St, New York',
            });
            addressModel_1.updateAddress.mockResolvedValue(1);
            const response = await (0, supertest_1.default)(server_1.default)
                .patch('/addresses/5')
                .send({
                address: '789 Oak St, Los Angeles',
            });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Address updated successfully');
        });
        it('should return 404 if address not found', async () => {
            addressModel_1.getAddressByUserId.mockResolvedValue(null);
            const response = await (0, supertest_1.default)(server_1.default)
                .patch('/addresses/99')
                .send({
                address: '789 Oak St, Los Angeles',
            });
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Address not found');
        });
        it('should return 400 for invalid input', async () => {
            const response = await (0, supertest_1.default)(server_1.default).patch('/addresses/5').send({});
            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
        });
    });
});
