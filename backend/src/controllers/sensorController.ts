import { Request, Response } from 'express';

export const fetchSensorData = async (req: Request, res: Response) => {
  try {
    console.log("Запит на отримання даних сенсора");
    const sensorData = [
      { temperature: 22, humidity: 60 },
      { temperature: 23, humidity: 55 },
    ];
    res.status(200).json(sensorData);
  } catch (error) {
    console.error('Помилка:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
};
