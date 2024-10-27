import React from "react";
import "tailwindcss/tailwind.css"; // імпорт Tailwind CSS
import Dashboard from "@/components/layout/Dashboard";
import AuthButton from "@/components/common/AuthButton";

const Home: React.FC = () => {
  return (
<<<<<<< HEAD
    <div className="bg-custom-gray text-white p-4">
=======
    <div className="">
>>>>>>> f47915bc19179275be355bf77961612697d0edf3
      <h1 className="text-3xl font-extrabold text-center p-7">
        Welcome to My Sensor Data Dashboard
      </h1>
      <div className="flex w-screen  h-screen">
        <div className="w-[70%] p-4">
          <Dashboard isAuthenticated={true} />
        </div>
        <div className="w-[30%] flex mt-12 justify-center ">
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Home;
