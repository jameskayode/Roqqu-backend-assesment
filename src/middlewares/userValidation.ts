import { Request, Response, NextFunction } from 'express';
import { validationResult, check } from 'express-validator';
import db from '../config/database';

// Middleware to validate user creation
export const validateCreateUser = [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('email').trim().isEmail().withMessage('Valid email is required'),
  
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // Ensure function stops here
      }
  
      try {
        const existingUser = await db('users').where('email', req.body.email).first();
        if (existingUser) {
          res.status(400).json({ error: 'Email already exists' });
          return;
        }
  
        return next(); // Call next middleware
      } catch (error) {
        return next(error); // Proper error handling
      }
    }
  ];
  

// Middleware to validate pagination parameters
export const validatePagination = (req: Request, res: Response, next: NextFunction): void => {
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

// Middleware to validate user ID
export const validateUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await db('users').where('id', req.params.id).first();
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; 
    }
    next();
  } catch (error) {
    next(error);
  }
};
