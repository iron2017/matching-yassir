import { Router } from 'express';
import { getNearbyDrivers } from '../controllers/driverController';

const router = Router();


router.get('/nearby', getNearbyDrivers);

export default router;
