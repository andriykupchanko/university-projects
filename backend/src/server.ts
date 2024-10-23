import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/sequelize'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const url = process.env.ARDUINO_URL || ''; // Змініть на IP вашої Arduino

app.use(cors());
app.use(express.json());

app.get('/api/sensors', async (req, res) => {
  try {
    const response = await axios.get(url); // Запит до Arduino
    console.log('Data from Arduino:', response.data);
    res.status(200).json(response.data);
  } catch (error: unknown) { // Визначення типу для error
    if (axios.isAxiosError(error)) { // Перевірка, чи це помилка Axios
      console.error('Error fetching from Arduino:', error.message);
      console.error('Error details:', error.response ? error.response.data : error); // Додаткові деталі помилки
      console.log('Error fetching from Arduino, returning random data');
      
      // Генерація випадкових даних датчиків
      const randomSensorData = Array.from({ length: 10 }, () => ({
        temperature: Math.random() * 100, 
        humidity: Math.random() * 100     
      }));
      res.status(200).json(randomSensorData); // Повертаємо випадкові дані
    } else {
      console.error('Unexpected error:', error); // Обробка неочікуваних помилок
      res.status(500).send('Unexpected error occurred');
    }
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
