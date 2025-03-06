"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Purpose: Define routes for address endpoints.
const express_1 = __importDefault(require("express"));
const addressController_1 = require("../controllers/addressController");
const asyncHandler_1 = require("../utils/asyncHandler");
const addressValidation_1 = require("../middlewares/addressValidation");
const router = express_1.default.Router();
// GET /address/:userID - Get a user's address
router.get('/:userID', (0, asyncHandler_1.asyncHandler)(addressController_1.getAddressController));
// POST /address - Create a new address (with validation)
router.post('/', [...addressValidation_1.validateAddressInput, addressValidation_1.checkExistingAddress], (0, asyncHandler_1.asyncHandler)(addressController_1.createAddressController));
// PATCH /addresses/{userID} - Modify address
router.patch('/:userID', [...addressValidation_1.validateAddressUpdate, addressValidation_1.validateAddressExists], (0, asyncHandler_1.asyncHandler)(addressController_1.updateAddressController));
exports.default = router;
