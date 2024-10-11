// frontend/src/pages/index.tsx
import SensorData from '../components/common/SensorData';

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Sensor Dashboard</h1>
      <SensorData />
    </div>
  );
};

export default Home;
