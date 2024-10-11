// src/routes/sensorRoutes.ts
import express from 'express';
import { fetchSensorData } from '../controllers/sensorController';

const router = express.Router();

// Маршрут для отримання даних сенсора
router.get('/sensors', fetchSensorData);

export default router;
