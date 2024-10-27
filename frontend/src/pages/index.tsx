import React, { useState } from "react";
import "tailwindcss/tailwind.css"; // Імпорт Tailwind CSS
import Dashboard from "@/components/layout/Dashboard";
import AuthButton from "@/components/common/AuthButton";

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Додайте стан аутентифікації

  return (
    <div className="bg-custom-gray text-white p-4">
      <h1 className="text-3xl font-extrabold text-center p-7">
        Welcome to My Sensor Data Dashboard
      </h1>
      <div className="flex w-screen h-screen">
        <div className="w-[70%] p-4">
          <Dashboard isAuthenticated={isAuthenticated} />{" "}
          {/* Передайте isAuthenticated */}
        </div>
        <div className="w-[30%] flex mt-12 justify-center">
          <AuthButton onLogin={() => setIsAuthenticated(true)} />{" "}
          {/* Передайте функцію для оновлення стану */}
        </div>
      </div>
    </div>
  );
};

export default Home;
