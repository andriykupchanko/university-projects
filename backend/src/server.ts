// backend/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db'; // Import your database pool

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Sample endpoint to fetch sensor data
app.get('/api/sensors', (req, res) => {
  const sensorData = [
    { temperature: 22, humidity: 60 },
    { temperature: 23, humidity: 55 },
  ];
  res.status(200).json(sensorData);
});

// Check PostgreSQL connection
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully!');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Could not connect to PostgreSQL database:', err);
  });
