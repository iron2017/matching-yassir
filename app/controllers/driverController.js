"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDriverLocation = exports.getNearbyDrivers = void 0;
const ngeohash_1 = require("ngeohash");
const driverModel_1 = __importDefault(require("../models/driverModel"));
const geohash = __importStar(require("ngeohash"));
// Dummy data for demonstration
let drivers = [
    new driverModel_1.default(1, 'John Doe', 40.7128, -74.0060),
    new driverModel_1.default(2, 'Jane Doe', 34.0522, -118.2437),
    new driverModel_1.default(3, 'Bob Smith', 51.5074, -0.1278) // London
];
const getNearbyDrivers = (req, res) => {
    const { latitude, longitude } = req.query;
    const precision = 6; // Geohash precision
    const driverGeohash = geohash.encode(parseFloat(latitude), parseFloat(longitude), precision);
    const neighborsResult = (0, ngeohash_1.neighbors)(driverGeohash).concat(driverGeohash);
    const nearbyDrivers = drivers.filter(driver => {
        const driverGeohash = geohash.encode(driver.latitude, driver.longitude, precision);
        return neighborsResult.includes(driverGeohash);
    });
    res.status(200).json({ nearbyDrivers });
};
exports.getNearbyDrivers = getNearbyDrivers;
// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
// Set driver location
const setDriverLocation = (req, res) => {
    const { id, latitude, longitude } = req.body;
    // Update driver location
    const driver = drivers.find(driver => driver.id === id);
    if (driver) {
        driver.latitude = latitude;
        driver.longitude = longitude;
        res.status(200).json({ message: 'Driver location updated successfully', driver });
        // Emit driver location update to connected clients
        return driver;
    }
    else {
        res.status(404).json({ message: 'Driver not found' });
    }
};
exports.setDriverLocation = setDriverLocation;
