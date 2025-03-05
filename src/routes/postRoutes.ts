// import express from 'express';
// import {
//   getPostsController,
//   createPostController,
//   deletePostController,
// } from '../controllers/postController';
// // import { validatePost } from '../middlewares/validation';
// import { asyncHandler } from '../utils/asyncHandler';
// import { validatePost } from '../middlewares/validation';

// const router = express.Router();

// router.get('/', asyncHandler(getPostsController)); // GET /posts?userId={userId}
// router.post('/', validatePost, asyncHandler(createPostController)); // POST /posts
// router.delete('/:id', validatePost, asyncHandler(deletePostController)); // DELETE /posts/:id

// export default router;


import express from 'express';
import {
  getPostsController,
  createPostController,
  deletePostController
} from '../controllers/postController';
import { asyncHandler } from '../utils/asyncHandler';
import { validateGetPosts, validateCreatePost, validatePostExists } from '../middlewares/postValidation';

const router = express.Router();

// GET /posts?userId=1 - Get all posts for a user
router.get('/', validateGetPosts, asyncHandler(getPostsController));

// POST /posts - Create a new post
router.post('/', validateCreatePost, asyncHandler(createPostController));

// DELETE /posts/:id - Delete a post
router.delete('/:id', validatePostExists, asyncHandler(deletePostController));

export default router;
