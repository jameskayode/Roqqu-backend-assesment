
import request from 'supertest';
import app from '../server';
import { getUsers, getUsersCount, getUserById } from '../models/userModel';
import db from '../config/database';

jest.mock('../models/userModel');
jest.mock('../config/database');

describe('User API Endpoints', () => {
  
  let dbMock: any;

  beforeEach(() => {
    // Mock database functions before each test
    dbMock = {
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValue(null), // Simulate user not existing
      insert: jest.fn().mockResolvedValue([10]), // Simulate successful insertion
      returning: jest.fn().mockResolvedValue([{ id: 10 }]), // Simulate return of new user ID
    };

    (db as unknown as jest.Mock).mockImplementation(() => dbMock);
  });

  /** GET /users - Fetch paginated users */
  describe('GET /users', () => {
    it('should return a paginated list of users', async () => {
      (getUsers as jest.Mock).mockResolvedValue([
        {
          id: 5,
          name: 'James',
          email: 'james@gmail.com',
        },
      ]);

      const response = await request(app).get('/users?pageNumber=1&pageSize=10');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('James');
    });

    it('should return 404 if no users are found', async () => {
      (getUsers as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/users?pageNumber=1&pageSize=10');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('No users found');
    });

    it('should return 400 for invalid page number', async () => {
      const response = await request(app).get('/users?pageNumber=0&pageSize=10');

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Page number must start from 1');
    });
  });

  /** GET /users/count - Fetch user count */
  describe('GET /users/count', () => {
    it('should return the total number of users', async () => {
      (getUsersCount as jest.Mock).mockResolvedValue(50);

      const response = await request(app).get('/users/count');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ count: 50 });
    });
  });

  /** GET /users/:id - Fetch a single user */
  describe('GET /users/:id', () => {
    it('should return a user if found', async () => {
      (getUserById as jest.Mock).mockResolvedValue({
        id: 5,
        name: 'James',
        email: 'james@gmail.com',
      });

      const response = await request(app).get('/users/5');

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('James');
    });

    it('should return 404 if user is not found', async () => {
      (getUserById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/users/99');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });

  /** POST /users - Create a user */
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
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

      const response = await request(app)
        .post('/users')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email already exists');
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app).post('/users').send({});

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].msg).toBeDefined();
    });
  });
});

