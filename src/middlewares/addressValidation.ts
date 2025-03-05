import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { getAddressByUserId } from '../models/addressModel';

// Middleware to validate request body for address creation/update
export const validateAddressInput = [
  check('userId').isInt().withMessage('Valid userId is required'),
  check('address').notEmpty().withMessage('Address cannot be empty'),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  }
];
// Middleware to validate request body for address update
export const validateAddressUpdate = [
    check('address').notEmpty().withMessage('Address cannot be empty'),
  
    (req: Request, res: Response, next: NextFunction): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    }
  ];
  
// Middleware to check if the user already has an address
export const checkExistingAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = Number(req.body.userId || req.params.userID);
  try {
    const existingAddress = await getAddressByUserId(userId);
    if (existingAddress) {
      res.status(400).json({ message: 'User already has an address' });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check if the address exists before updating
export const validateAddressExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = Number(req.params.userID);

  try {
    const existingAddress = await getAddressByUserId(userId);
    if (!existingAddress) {
      res.status(404).json({ message: 'Address not found' });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

