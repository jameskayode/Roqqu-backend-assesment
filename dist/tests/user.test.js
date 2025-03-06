"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const userModel_1 = require("../models/userModel");
const database_1 = __importDefault(require("../config/database"));
jest.mock('../models/userModel');
jest.mock('../config/database');
describe('User API Endpoints', () => {
    let dbMock;
    beforeEach(() => {
        // Mock database functions before each test
        dbMock = {
            where: jest.fn().mockReturnThis(),
            first: jest.fn().mockResolvedValue(null), // Simulate user not existing
            insert: jest.fn().mockResolvedValue([10]), // Simulate successful insertion
            returning: jest.fn().mockResolvedValue([{ id: 10 }]), // Simulate return of new user ID
        };
        database_1.default.mockImplementation(() => dbMock);
    });
    /** GET /users - Fetch paginated users */
    describe('GET /users', () => {
        it('should return a paginated list of users', async () => {
            userModel_1.getUsers.mockResolvedValue([
                {
                    id: 5,
                    name: 'James',
                    email: 'james@gmail.com',
                },
            ]);
            const response = await (0, supertest_1.default)(server_1.default).get('/users?pageNumber=1&pageSize=10');
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].name).toBe('James');
        });
        it('should return 404 if no users are found', async () => {
            userModel_1.getUsers.mockResolvedValue([]);
            const response = await (0, supertest_1.default)(server_1.default).get('/users?pageNumber=1&pageSize=10');
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No users found');
        });
        it('should return 400 for invalid page number', async () => {
            const response = await (0, supertest_1.default)(server_1.default).get('/users?pageNumber=0&pageSize=10');
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Page number must start from 1');
        });
    });
    /** GET /users/count - Fetch user count */
    describe('GET /users/count', () => {
        it('should return the total number of users', async () => {
            userModel_1.getUsersCount.mockResolvedValue(50);
            const response = await (0, supertest_1.default)(server_1.default).get('/users/count');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ count: 50 });
        });
    });
    /** GET /users/:id - Fetch a single user */
    describe('GET /users/:id', () => {
        it('should return a user if found', async () => {
            userModel_1.getUserById.mockResolvedValue({
                id: 5,
                name: 'James',
                email: 'james@gmail.com',
            });
            const response = await (0, supertest_1.default)(server_1.default).get('/users/5');
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('James');
        });
        it('should return 404 if user is not found', async () => {
            userModel_1.getUserById.mockResolvedValue(null);
            const response = await (0, supertest_1.default)(server_1.default).get('/users/99');
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });
    });
    /** POST /users - Create a user */
    describe('POST /users', () => {
        it('should create a new user', async () => {
            const response = await (0, supertest_1.default)(server_1.default)
                .post('/users')
                .send({
                name: 'John Doe',
                email: 'john@example.com',
            });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User created successfully');
            expect(response.body.userId).toBe(10);
            expect(dbMock.insert).toHaveBeenCalled(); // Ensure DB insert was called
        });
        it('should return 400 if email already exists', async () => {
            dbMock.first.mockResolvedValueOnce({ email: 'john@example.com' }); // Simulate existing email
            const response = await (0, supertest_1.default)(server_1.default)
                .post('/users')
                .send({
                name: 'John Doe',
                email: 'john@example.com',
            });
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Email already exists');
        });
        it('should return 400 for invalid input', async () => {
            const response = await (0, supertest_1.default)(server_1.default).post('/users').send({});
            expect(response.status).toBe(400);
            expect(response.body.errors).toBeInstanceOf(Array);
            expect(response.body.errors[0].msg).toBeDefined();
        });
    });
});
