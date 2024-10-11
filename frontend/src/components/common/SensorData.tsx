import React, { useEffect, useState } from 'react';

interface Sensor {
  temperature: number;
  humidity: number;
}

const SensorData = () => {
  const [data, setData] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/sensors');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
        }
        const result = await response.json();
        setData(result);
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

    fetchData();
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
      <ul>
        {data.map((sensor, index) => (
          <li key={index}>
            Temperature: {sensor.temperature}, Humidity: {sensor.humidity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SensorData;
