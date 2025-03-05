import { Request, Response } from 'express';
import { createPost, deletePost, getPostsByUser } from '../models/postModel';
import db from '../config/database';

// GET /posts?userId=1 - Get all posts for a user
export const getPostsController = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const posts = await getPostsByUser(Number(userId));
  if (!posts.length) {
    return res.status(404).json({ message: 'No posts found for this user' });
  }

  res.status(200).json({
    status: 'success',
    totalPosts: posts.length,
    data: posts,
  });
};

// POST /posts - Create a new post
export const createPostController = async (req: Request, res: Response) => {
  const { title, body, userId } = req.body;
// Check for duplicate post
const existingPost = await db('posts').where({ title, body, userId }).first();
if (existingPost) {
  return res.status(400).json({ message: 'A post with the same title and body already exists for this user' });
}
  await createPost({ title, body, userId });

  res.status(201).json({ message: 'Post created successfully' });
};

// DELETE /posts/:id - Delete a post
export const deletePostController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deletePost(Number(id));

  res.status(200).json({ message: 'Post deleted successfully' });
};
