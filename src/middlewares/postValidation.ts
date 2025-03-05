import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import db from '../config/database';
import { getUserById } from '../models/userModel';
import { getPostById } from '../models/postModel';

// Middleware to validate GET /posts query parameters
export const validateGetPosts = [
  check('userId').notEmpty().withMessage('User ID is required').isInt().withMessage('User ID must be an integer'),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; 
    }
    return next(); 
  }
];
// Middleware to validate POST /posts request body
export const validateCreatePost = [
  check('title').notEmpty().withMessage('Title is required'),
  check('body').notEmpty().withMessage('Body is required'),
  check('userId').isInt().withMessage('Valid User ID is required'),

  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, body, userId } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const user = await getUserById(Number(userId));
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return; 
      }
      const existingPost = await db('posts').where({ title, body, userId }).first();
      if (existingPost) {
        res.status(400).json({ message: 'A post with the same title and body already exists for this user' });
        return; 
      }

      return next(); 
    } catch (error) {
      return next(error);
    }
  }
];
export const validatePostExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const postId = Number(req.params.id);

  try {
    const post = await getPostById(postId);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return; // ✅ Ensure function exits
    }
    return next();
  } catch (error) {
    return next(error); // ✅ Correct error passing
  }
};

export const validatePostId = [
    check('id').isInt().withMessage('Invalid post ID'),
  
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
  