import db from '../config/database';

export const getPostsByUser = async (userId: number) => {
  return db('posts').select('*').where({ userId });
};

export const createPost = async (post: any) => {
  return db('posts').insert(post);
};

export const getPostById = async (id: number) => {
  return db('posts').where({ id }).first();
};

export const deletePost = async (id: number) => {
  return db('posts').where({ id }).del();
};
