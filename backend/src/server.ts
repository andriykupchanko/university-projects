import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/sequelize'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const url = process.env.ARDUINO_URL || '';


app.use(cors());
app.use(express.json());

app.get('/api/sensors', async (req, res) => {
  try {
    const response = await axios.get(url);
    console.log('Data from Arduino:', response.data);
    res.status(200).json([response.data]);
  } catch (error) {
    console.error('Error fetching from Arduino, returning random data');
    const randomSensorData = Array.from({ length: 10 }, () => ({
      temperature: Math.random() * 100, 
      humidity: Math.random() * 100     
    }));
    res.status(200).json(randomSensorData);
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully!');
  })
  .catch((err) => {
    console.error('Could not connect to PostgreSQL database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
