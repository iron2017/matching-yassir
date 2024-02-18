import { Router } from 'express';
import {
    getAllRequests,
    getRequestById,
    createRequest,
    updateRequestById,
    deleteRequestById
} from '../controllers/requestController';

const router = Router();

// Define routes for requests
router.get('/', getAllRequests); // Get all requests
router.get('/:id', getRequestById); // Get request by ID
router.post('/', createRequest); // Create a new request
router.put('/:id', updateRequestById); // Update request by ID
router.delete('/:id', deleteRequestById); // Delete request by ID

export default router;
