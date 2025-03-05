import { Request, Response } from 'express';
import { createAddress, getAddressByUserId, updateAddress } from '../models/addressModel';

// GET /address/:userID - Get a user's address
export const getAddressController = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const address = await getAddressByUserId(Number(userID));
  if (!address) {
    return res.status(404).json({ message: 'No address found for this user' });
  }
  res.status(200).json({ status: 'success', data: address });
};

// POST /address - Create a new address
export const createAddressController = async (req: Request, res: Response) => {
  const { userId, address } = req.body;
  await createAddress({ userId, address });
  res.status(201).json({ message: 'Address created successfully' });
};

// PUT /address/:userID - Update address
export const updateAddressController = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ message: 'Address field is required' });
    }
    const updatedRows = await updateAddress(Number(userID), address);
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'No address found for this user' });
    }
    res.status(200).json({ message: 'Address updated successfully' });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
