import db from '../config/database';

export const getAddressByUserId = async (userId: number) =>
  db('addresses').where({ userId }).first();

export const createAddress = async (address: any) => db('addresses').insert(address);

export const updateAddress = async (userId: number, newAddress: string) => {
  const updated = await db('addresses')
    .where({ userId })
    .update({ address: newAddress });

  return updated;
}