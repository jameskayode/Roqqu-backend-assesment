"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostController = exports.createPostController = exports.getPostsController = void 0;
const postModel_1 = require("../models/postModel");
const database_1 = __importDefault(require("../config/database"));
// GET /posts?userId=1 - Get all posts for a user
const getPostsController = async (req, res) => {
    const { userId } = req.query;
    const posts = await (0, postModel_1.getPostsByUser)(Number(userId));
    if (!posts.length) {
        return res.status(404).json({ message: 'No posts found for this user' });
    }
    res.status(200).json({
        status: 'success',
        totalPosts: posts.length,
        data: posts,
    });
};
exports.getPostsController = getPostsController;
// POST /posts - Create a new post
const createPostController = async (req, res) => {
    const { title, body, userId } = req.body;
    // Check for duplicate post
    const existingPost = await (0, database_1.default)('posts').where({ title, body, userId }).first();
    if (existingPost) {
        return res.status(400).json({ message: 'A post with the same title and body already exists for this user' });
    }
    await (0, postModel_1.createPost)({ title, body, userId });
    res.status(201).json({ message: 'Post created successfully' });
};
exports.createPostController = createPostController;
// DELETE /posts/:id - Delete a post
const deletePostController = async (req, res) => {
    const { id } = req.params;
    await (0, postModel_1.deletePost)(Number(id));
    res.status(200).json({ message: 'Post deleted successfully' });
};
exports.deletePostController = deletePostController;
