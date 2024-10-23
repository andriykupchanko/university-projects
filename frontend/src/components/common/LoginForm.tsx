import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleRegisterClick = () => {
    setShowRegistration(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-md w-96 relative"
        onClick={(e) => e.stopPropagation()} // Зупиняємо клік на формі, щоб не закрити
      >
        {/* Хрестик для закриття форми */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          &times; {/* HTML символ для хрестика */}
        </button>

        {showRegistration ? (
          <RegistrationForm onClose={onClose} />
        ) : (
          <>
            <h2 className="text-xl font-bold">Login</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-1">Email:</label>
                <input
                  type="email"
                  required
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password:</label>
                <input
                  type="password"
                  required
                  className="border rounded w-full p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Login
              </button>
            </form>
            <p className="mt-4">
              Don`t have an account? 
              <button
                onClick={handleRegisterClick}
                className="text-blue-500 hover:underline ml-1"
              >
                Register
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
