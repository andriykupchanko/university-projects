// src/app.ts
import express from 'express';
import sensorRoutes from './routes/sensorRoutes';

const app = express();

app.use(express.json()); // Для парсингу JSON

// Маршрути
app.use('/api', sensorRoutes);

export default app;
