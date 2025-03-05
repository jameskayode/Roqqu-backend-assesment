// Purpose: Define routes for address endpoints.
import express from 'express';
import {
  getAddressController,
  createAddressController,
  updateAddressController
} from '../controllers/addressController';
import { asyncHandler } from '../utils/asyncHandler';
import { validateAddressInput, checkExistingAddress, validateAddressExists, validateAddressUpdate } from '../middlewares/addressValidation';

const router = express.Router();
// GET /address/:userID - Get a user's address
router.get('/:userID', asyncHandler(getAddressController));
// POST /address - Create a new address (with validation)
router.post('/', [...validateAddressInput, checkExistingAddress], asyncHandler(createAddressController));
// PATCH /addresses/{userID} - Modify address
router.patch('/:userID', [...validateAddressUpdate, validateAddressExists], asyncHandler(updateAddressController));

export default router;
