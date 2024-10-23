// pages/index.tsx
import React from 'react';
import SensorDataChart from '@/components/specific/SensorDataChart';
import AuthButton from '@/components/common/AuthButton';



const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Sensor Data Dashboard</h1>
      <SensorDataChart />
      <AuthButton/>
    </div>
  );
};

export default Home;
