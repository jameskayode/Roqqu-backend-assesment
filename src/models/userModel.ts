import db from '../config/database';

// Get Users Count (returns a number)
export const getUsersCount = async (): Promise<{ count: number }> => {
  const result = await db('users').count('* as count').first();

  if (!result || !result.count) {
    return { count: 0 };
  }

  // Convert result.count to number explicitly
  return { count: parseInt(result.count as string, 10) };
};

export const getUsers = (limit: number, offset: number) =>
  db('users')
    .select('users.id as user_id', 'users.name', 'users.email', 'addresses.address')
    .leftJoin('addresses', 'users.id', '=', 'addresses.userId')
    .limit(limit)
    .offset(offset);

// Fetch a Single User by ID
export const getUserById = async (id: number) =>
  db('users')
    .select('users.id as user_id', 'users.name', 'users.email', 'addresses.address')
    .leftJoin('addresses', 'users.id', '=', 'addresses.userId')
    .where('users.id', id)
    .first();

// Create User
export const createUser = async (user: any) => {
  if (db.client.config.client === 'pg') {
    return db('users').insert(user).returning('id');
  }
  return db('users').insert(user);
};
