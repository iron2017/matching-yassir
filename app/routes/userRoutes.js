"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Define routes for users
router.get('/', userController_1.getAllUsers); // Get all users
router.get('/:id', userController_1.getUserById); // Get user by ID
router.post('/', userController_1.createUser); // Create a new user
router.put('/:id', userController_1.updateUserById); // Update user by ID
router.delete('/:id', userController_1.deleteUserById); // Delete user by ID
exports.default = router;
