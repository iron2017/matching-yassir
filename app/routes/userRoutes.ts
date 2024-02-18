import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} from '../controllers/userController';

const router = Router();

// Define routes for users
router.get('/', getAllUsers); // Get all users
router.get('/:id', getUserById); // Get user by ID
router.post('/', createUser); // Create a new user
router.put('/:id', updateUserById); // Update user by ID
router.delete('/:id', deleteUserById); // Delete user by ID

export default router;
