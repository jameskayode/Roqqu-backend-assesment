import { Request, Response } from 'express';
import { getUsers, getUserById, getUsersCount } from '../models/userModel';
import db from '../config/database';

// GET /users - Get all users with pagination
export const getUsersController = async (req: Request, res: Response) => {
  const { pageNumber, pageSize } = req.query;
  const offset = (Number(pageNumber) - 1) * Number(pageSize);

  const users = await getUsers(Number(pageSize), offset);
  if (users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }
  res.status(200).json({
    status: "success",
    pageNumber,
    pageSize,
    totalUsers: users.length,
    data: users,
  });
};

// GET /users/count - Get total user count
export const getUsersCountController = async (_req: Request, res: Response) => {
  const count = await getUsersCount();
  res.json({ count });
};

// GET /users/:id - Get a user by ID
export const getUserByIdController = async (req: Request, res: Response) => {
  const user = await getUserById(Number(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

// POST /users - Create a new user
export const createUserController = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  console.log(req.body);
  const [userId] = await db('users').insert({ name, email }).returning('id');
  res.status(201).json({ message: 'User created successfully', userId });
};
