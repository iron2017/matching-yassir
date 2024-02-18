import { neighbors } from 'ngeohash';
import { Request, Response } from 'express';
import  Driver from '../models/driverModel';
import * as geohash from 'ngeohash';

// Dummy data for demonstration
let drivers: Driver[] = [
    new Driver(1, 'John Doe', 40.7128, -74.0060), // New York City
    new Driver(2, 'Jane Doe', 34.0522, -118.2437), // Los Angeles
    new Driver(3, 'Bob Smith', 51.5074, -0.1278) // London
];

export const getNearbyDrivers = (req: Request, res: Response): void => {
    const { latitude, longitude } = req.query;
    const precision = 6; // Geohash precision
    const driverGeohash = geohash.encode(parseFloat(latitude as string), parseFloat(longitude as string), precision);
    const neighborsResult = neighbors(driverGeohash).concat(driverGeohash);
    const nearbyDrivers = drivers.filter(driver => {
        const driverGeohash = geohash.encode(driver.latitude, driver.longitude, precision);
        return neighborsResult.includes(driverGeohash);
    });
    res.status(200).json({ nearbyDrivers });
}

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}



// Set driver location
export const setDriverLocation = (req: Request, res: Response): any => {
    const { id, latitude, longitude } = req.body as { id: number, latitude: number, longitude: number };
    
    // Update driver location
    const driver = drivers.find(driver => driver.id === id);
    if (driver) {
        driver.latitude = latitude;
        driver.longitude = longitude;
        res.status(200).json({ message: 'Driver location updated successfully', driver });
        
        // Emit driver location update to connected clients
        return driver
    } else {
        res.status(404).json({ message: 'Driver not found' });
    }
}
