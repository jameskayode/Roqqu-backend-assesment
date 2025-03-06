"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const asyncHandler_1 = require("../utils/asyncHandler");
const userValidation_1 = require("../middlewares/userValidation");
const router = express_1.default.Router();
// GET /users - Get all users with pagination
router.get('/', userValidation_1.validatePagination, (0, asyncHandler_1.asyncHandler)(userController_1.getUsersController));
// GET /users/count - Get the total count of users
router.get('/count', (0, asyncHandler_1.asyncHandler)(userController_1.getUsersCountController));
// GET /users/{id} - Get a single user by ID
router.get('/:id', userValidation_1.validateUserId, (0, asyncHandler_1.asyncHandler)(userController_1.getUserByIdController));
// POST /users - Create a new user
router.post('/', [...userValidation_1.validateCreateUser], (0, asyncHandler_1.asyncHandler)(userController_1.createUserController));
exports.default = router;
