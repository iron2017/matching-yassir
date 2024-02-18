"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requestController_1 = require("../controllers/requestController");
const router = (0, express_1.Router)();
// Define routes for requests
router.get('/', requestController_1.getAllRequests); // Get all requests
router.get('/:id', requestController_1.getRequestById); // Get request by ID
router.post('/', requestController_1.createRequest); // Create a new request
router.put('/:id', requestController_1.updateRequestById); // Update request by ID
router.delete('/:id', requestController_1.deleteRequestById); // Delete request by ID
exports.default = router;
