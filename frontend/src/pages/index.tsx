// pages/index.tsx
import React from 'react';
import SensorDataChart from '../components/specific/SensorDataChart';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Sensor Data Dashboard</h1>
      <SensorDataChart />
    </div>
  );
};

export default Home;
