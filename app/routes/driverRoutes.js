"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const driverController_1 = require("../controllers/driverController");
const router = (0, express_1.Router)();
router.get('/nearby', driverController_1.getNearbyDrivers);
exports.default = router;
