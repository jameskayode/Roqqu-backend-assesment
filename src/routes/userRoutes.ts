import express from 'express';
import {
  getUsersController,
  getUsersCountController,
  getUserByIdController,
  createUserController
} from '../controllers/userController';
import { asyncHandler } from '../utils/asyncHandler';
import { validateCreateUser, validatePagination, validateUserId } from '../middlewares/userValidation';

const router = express.Router();

// GET /users - Get all users with pagination
router.get('/', validatePagination, asyncHandler(getUsersController));
// GET /users/count - Get the total count of users
router.get('/count', asyncHandler(getUsersCountController));
// GET /users/{id} - Get a single user by ID
router.get('/:id', validateUserId, asyncHandler(getUserByIdController));
// POST /users - Create a new user
router.post('/', [...validateCreateUser], asyncHandler(createUserController));

export default router;
