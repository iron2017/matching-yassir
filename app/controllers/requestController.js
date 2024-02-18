"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequestById = exports.updateRequestById = exports.createRequest = exports.getRequestById = exports.getAllRequests = void 0;
const requestModel_1 = __importDefault(require("../models/requestModel"));
// Dummy data for demonstration
let requests = [
    new requestModel_1.default(1, 1, 40.7128, -74.0060),
    new requestModel_1.default(2, 2, 34.0522, -118.2437),
    new requestModel_1.default(3, 3, 51.5074, -0.1278) // London
];
// Get all requests
const getAllRequests = (req, res) => {
    res.status(200).json({ requests });
};
exports.getAllRequests = getAllRequests;
// Get request by ID
const getRequestById = (req, res) => {
    const requestId = parseInt(req.params.id);
    const request = requests.find(request => request.id === requestId);
    if (request) {
        res.status(200).json({ request });
    }
    else {
        res.status(404).json({ message: 'Request not found' });
    }
};
exports.getRequestById = getRequestById;
// Create a new request
const createRequest = (req, res) => {
    const { id, userId, latitude, longitude } = req.body;
    const newRequest = new requestModel_1.default(id, userId, latitude, longitude);
    requests.push(newRequest);
    res.status(201).json({ message: 'Request created successfully', request: newRequest });
};
exports.createRequest = createRequest;
// Update request by ID
const updateRequestById = (req, res) => {
    const requestId = parseInt(req.params.id);
    const { userId, latitude, longitude } = req.body;
    const requestIndex = requests.findIndex(request => request.id === requestId);
    if (requestIndex !== -1) {
        requests[requestIndex].userId = userId || requests[requestIndex].userId;
        requests[requestIndex].latitude = latitude || requests[requestIndex].latitude;
        requests[requestIndex].longitude = longitude || requests[requestIndex].longitude;
        res.status(200).json({ message: `Request ${requestId} updated successfully`, request: requests[requestIndex] });
    }
    else {
        res.status(404).json({ message: 'Request not found' });
    }
};
exports.updateRequestById = updateRequestById;
// Delete request by ID
const deleteRequestById = (req, res) => {
    const requestId = parseInt(req.params.id);
    const requestIndex = requests.findIndex(request => request.id === requestId);
    if (requestIndex !== -1) {
        requests.splice(requestIndex, 1);
        res.status(200).json({ message: `Request ${requestId} deleted successfully` });
    }
    else {
        res.status(404).json({ message: 'Request not found' });
    }
};
exports.deleteRequestById = deleteRequestById;
