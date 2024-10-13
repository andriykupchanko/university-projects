import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/sequelize'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/sensors', (req, res) => {
  const sensorData = [
    { temperature: 22, humidity: 60 },
    { temperature: 23, humidity: 55 },
  ];
  res.status(200).json(sensorData);
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
