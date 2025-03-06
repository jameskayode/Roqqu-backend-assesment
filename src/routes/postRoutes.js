"use strict";
// import express from 'express';
// import {
//   getPostsController,
//   createPostController,
//   deletePostController,
// } from '../controllers/postController';
// // import { validatePost } from '../middlewares/validation';
// import { asyncHandler } from '../utils/asyncHandler';
// import { validatePost } from '../middlewares/validation';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.get('/', asyncHandler(getPostsController)); // GET /posts?userId={userId}
// router.post('/', validatePost, asyncHandler(createPostController)); // POST /posts
// router.delete('/:id', validatePost, asyncHandler(deletePostController)); // DELETE /posts/:id
// export default router;
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const asyncHandler_1 = require("../utils/asyncHandler");
const postValidation_1 = require("../middlewares/postValidation");
const router = express_1.default.Router();
// GET /posts?userId=1 - Get all posts for a user
router.get('/', postValidation_1.validateGetPosts, (0, asyncHandler_1.asyncHandler)(postController_1.getPostsController));
// POST /posts - Create a new post
router.post('/', postValidation_1.validateCreatePost, (0, asyncHandler_1.asyncHandler)(postController_1.createPostController));
// DELETE /posts/:id - Delete a post
router.delete('/:id', postValidation_1.validatePostExists, (0, asyncHandler_1.asyncHandler)(postController_1.deletePostController));
exports.default = router;
