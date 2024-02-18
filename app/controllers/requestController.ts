import { Request, Response } from 'express';
import  RequestModel from '../models/requestModel';

// Dummy data for demonstration
let requests: RequestModel[] = [
    new RequestModel(1, 1, 40.7128, -74.0060), // New York City
    new RequestModel(2, 2, 34.0522, -118.2437), // Los Angeles
    new RequestModel(3, 3, 51.5074, -0.1278) // London
];

// Get all requests
export const getAllRequests = (req: Request, res: Response): void => {
    res.status(200).json({ requests });
}

// Get request by ID
export const getRequestById = (req: Request, res: Response): void => {
    const requestId: number = parseInt(req.params.id);
    const request: RequestModel | undefined = requests.find(request => request.id === requestId);
    if (request) {
        res.status(200).json({ request });
    } else {
        res.status(404).json({ message: 'Request not found' });
    }
}

// Create a new request
export const createRequest = (req: Request, res: Response): void => {
    const { id, userId, latitude, longitude } = req.body;
    const newRequest: RequestModel = new RequestModel(id, userId, latitude, longitude);
    requests.push(newRequest);
    res.status(201).json({ message: 'Request created successfully', request: newRequest });
}

// Update request by ID
export const updateRequestById = (req: Request, res: Response): void => {
    const requestId: number = parseInt(req.params.id);
    const { userId, latitude, longitude } = req.body;
    const requestIndex: number = requests.findIndex(request => request.id === requestId);
    if (requestIndex !== -1) {
        requests[requestIndex].userId = userId || requests[requestIndex].userId;
        requests[requestIndex].latitude = latitude || requests[requestIndex].latitude;
        requests[requestIndex].longitude = longitude || requests[requestIndex].longitude;
        res.status(200).json({ message: `Request ${requestId} updated successfully`, request: requests[requestIndex] });
    } else {
        res.status(404).json({ message: 'Request not found' });
    }
}

// Delete request by ID
export const deleteRequestById = (req: Request, res: Response): void => {
    const requestId: number = parseInt(req.params.id);
    const requestIndex: number = requests.findIndex(request => request.id === requestId);
    if (requestIndex !== -1) {
        requests.splice(requestIndex, 1);
        res.status(200).json({ message: `Request ${requestId} deleted successfully` });
    } else {
        res.status(404).json({ message: 'Request not found' });
    }
}
