// pages/index.tsx
import React from "react";
import Dashboard from "@/components/layout/Dashboard";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Sensor Data Dashboard</h1>
      <Dashboard isAuthenticated={false} />
    </div>
  );
};

export default Home;
