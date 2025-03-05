// Jest test cases for Post API endpoints
import request from 'supertest';
import app from '../server';
import { getPostsByUser, createPost, deletePost, getPostById } from '../models/postModel';
import { getUserById } from '../models/userModel';

jest.mock('../models/postModel');
jest.mock('../models/userModel');

describe('Post API Endpoints', () => {

  /** GET /posts?userId=xxx - Fetch all posts for a user */
  describe('GET /posts', () => {
    it('should return posts for a user', async () => {
      (getPostsByUser as jest.Mock).mockResolvedValue([
        { id: 1, title: 'First Post', body: 'Hello world', userId: 5 },
        { id: 2, title: 'Second Post', body: 'Another post', userId: 5 },
      ]);

      const response = await request(app).get('/posts?userId=5');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.totalPosts).toBe(2);
      expect(response.body.data[0].title).toBe('First Post');
    });

    it('should return 400 if userId is missing', async () => {
      const response = await request(app).get('/posts');

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('User ID is required');
    });

    it('should return 404 if user has no posts', async () => {
      (getPostsByUser as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/posts?userId=99');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('No posts found for this user');
    });
  });

  /** POST /posts - Create a new post */
  describe('POST /posts', () => {
    it('should create a post successfully', async () => {
      (getUserById as jest.Mock).mockResolvedValue({ id: 5, name: 'John Doe' });
      (createPost as jest.Mock).mockResolvedValue([{ id: 10 }]); // Simulating DB insert

      const response = await request(app)
        .post('/posts')
        .send({
          userId: 5,
          title: 'New Post',
          body: 'This is a test post',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Post created successfully');
    });

    it('should return 404 if user does not exist', async () => {
      (getUserById as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/posts')
        .send({
          userId: 99,
          title: 'Invalid User Post',
          body: 'This user does not exist',
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });

    it('should return 400 for missing fields', async () => {
      const response = await request(app)
        .post('/posts')
        .send({ title: '', body: '', userId: '' });

      console.log('🔍 Response Body:', response.body); // Keep this for debugging

      expect(response.status).toBe(400);

      const errorMessages = response.body.errors.map((err: any) => err.msg);

      expect(errorMessages).toContain('Title is required');
      expect(errorMessages).toContain('Body is required');
      expect(errorMessages).toContain('UserId must be an integer');
    });

    it('should return 400 if a post with the same title and body already exists for the user', async () => {
      (getUserById as jest.Mock).mockResolvedValue({ id: 5, name: 'John Doe' });

      // Simulating an existing post in the database
      (getPostsByUser as jest.Mock).mockResolvedValue([
        { id: 1, title: 'Duplicate Post', body: 'Duplicate content', userId: 5 },
      ]);

      const response = await request(app)
        .post('/posts')
        .send({
          userId: 5,
          title: 'Duplicate Post',
          body: 'Duplicate content',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('A post with the same title and body already exists for this user');
    });
  });

  /** DELETE /posts/:id - Delete a post */
  describe('DELETE /posts/:id', () => {
    it('should delete a post successfully', async () => {
      (getPostById as jest.Mock).mockResolvedValue({ id: 1, title: 'Test Post', body: 'Content', userId: 5 });
      (deletePost as jest.Mock).mockResolvedValue(1); // Simulating delete success

      const response = await request(app).delete('/posts/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Post deleted successfully');
    });

    it('should return 404 if post does not exist', async () => {
      (getPostById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/posts/99');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Post not found');
    });

    it('should return 400 for invalid post ID', async () => {
      const response = await request(app).delete('/posts/invalid');

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('Invalid post ID');
    });
  });
});
