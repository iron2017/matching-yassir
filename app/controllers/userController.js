"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserLocation = exports.initWebSocket = exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
// Dummy data for demonstration
let users = [
    new userModel_1.default(1, 'Alice', 40.7128, -74.0060),
    new userModel_1.default(2, 'Bob', 34.0522, -118.2437),
    new userModel_1.default(3, 'Charlie', 51.5074, -0.1278) // London
];
// Get all users
const getAllUsers = (req, res) => {
    res.status(200).json({ users });
};
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        res.status(200).json({ user });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.getUserById = getUserById;
// Create a new user
const createUser = (req, res) => {
    const { id, name, latitude, longitude } = req.body;
    const newUser = new userModel_1.default(id, name, latitude, longitude);
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
};
exports.createUser = createUser;
// Update user by ID
const updateUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, latitude, longitude } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex].name = name || users[userIndex].name;
        users[userIndex].latitude = latitude || users[userIndex].latitude;
        users[userIndex].longitude = longitude || users[userIndex].longitude;
        res.status(200).json({ message: `User ${userId} updated successfully`, user: users[userIndex] });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.updateUserById = updateUserById;
// Delete user by ID
const deleteUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(200).json({ message: `User ${userId} deleted successfully` });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.deleteUserById = deleteUserById;
let io; // Socket.IO reference
// Function to initialize WebSocket
const initWebSocket = (server) => {
    io = require('socket.io')(server);
    io.on('connection', (socket) => {
        console.log('Client connected');
    });
};
exports.initWebSocket = initWebSocket;
// Set user location
const setUserLocation = (req, res) => {
    const { id, latitude, longitude } = req.body;
    // Update user location
    const user = users.find(user => user.id === id);
    if (user) {
        user.latitude = latitude;
        user.longitude = longitude;
        res.status(200).json({ message: 'User location updated successfully', user });
        // Emit user location update to connected clients
        io.emit('userLocationUpdate', user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.setUserLocation = setUserLocation;
