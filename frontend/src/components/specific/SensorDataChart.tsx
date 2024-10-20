import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Sensor {
  temperature: number;
  humidity: number;
  timestamp: string; // Додано поле для часової мітки
}

const SensorDataChart = () => {
  const [data, setData] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/sensors');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      const timestampedData = result.map((sensor: Sensor) => ({
        ...sensor,
        timestamp: new Date().toLocaleString(), // Додаємо поточну дату і час
      }));
      setData(timestampedData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000); // Запитуємо дані кожну секунду
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Sensor Data</h2>
      <LineChart width={1000} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />
        <Line type="monotone" dataKey="humidity" stroke="#387908" name="Humidity (%)" />
      </LineChart>
      <div>Current Date and Time: {new Date().toLocaleString()}</div>
    </div>
  );
};

export default SensorDataChart;
