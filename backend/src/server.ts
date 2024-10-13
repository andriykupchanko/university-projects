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

axios.get(url)
  .then(response => {
    console.log('Data:', response.data);
    app.get('/api/sensors', (req, res) => {
    const sensorData = [response.data];
    res.status(200).json(sensorData);
  });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully!');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err:Object) => {
    console.error('Could not connect to PostgreSQL database:', err);
  });
