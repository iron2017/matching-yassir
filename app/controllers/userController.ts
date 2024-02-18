import { Request, Response } from 'express';
import  User from '../models/userModel';
import * as socketIO from 'socket.io';

// Dummy data for demonstration
let users: User[] = [
    new User(1, 'Alice', 40.7128, -74.0060), // New York City
    new User(2, 'Bob', 34.0522, -118.2437), // Los Angeles
    new User(3, 'Charlie', 51.5074, -0.1278) // London
];

// Get all users
export const getAllUsers = (req: Request, res: Response): void => {
    res.status(200).json({ users });
}

// Get user by ID
export const getUserById = (req: Request, res: Response): void => {
    const userId: number = parseInt(req.params.id);
    const user: User | undefined = users.find(user => user.id === userId);
    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

// Create a new user
export const createUser = (req: Request, res: Response): void => {
    const { id, name, latitude, longitude } = req.body;
    const newUser: User = new User(id, name, latitude, longitude);
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
}

// Update user by ID
export const updateUserById = (req: Request, res: Response): void => {
    const userId: number = parseInt(req.params.id);
    const { name, latitude, longitude } = req.body;
    const userIndex: number = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex].name = name || users[userIndex].name;
        users[userIndex].latitude = latitude || users[userIndex].latitude;
        users[userIndex].longitude = longitude || users[userIndex].longitude;
        res.status(200).json({ message: `User ${userId} updated successfully`, user: users[userIndex] });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

// Delete user by ID
export const deleteUserById = (req: Request, res: Response): void => {
    const userId: number = parseInt(req.params.id);
    const userIndex: number = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(200).json({ message: `User ${userId} deleted successfully` });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

let io: socketIO.Server; // Socket.IO reference

// Function to initialize WebSocket
export const initWebSocket = (server: any): void => {
    io = require('socket.io')(server);
    io.on('connection', (socket: socketIO.Socket) => {
        console.log('Client connected');
    });
}

// Set user location
export const setUserLocation = (req: Request, res: Response): void => {
    const { id, latitude, longitude } = req.body;
    
    // Update user location
    const user: User | undefined = users.find(user => user.id === id);
    if (user) {
        user.latitude = latitude;
        user.longitude = longitude;
        res.status(200).json({ message: 'User location updated successfully', user });
        
        // Emit user location update to connected clients
        io.emit('userLocationUpdate', user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}
