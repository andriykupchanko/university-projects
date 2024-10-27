import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://your-backend-url/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ login, password })
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      console.log("Login successful", data);
      onClose(); // Закриваємо форму після успішного логіну
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex text-black justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-md w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          &times;
        </button>

        {showRegistration ? (
          <RegistrationForm onClose={onClose} />
        ) : (
          <>
            <h2 className="text-xl font-bold">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block mb-1">Login:</label>
                <input
                  type="text"
                  required
                  className="border rounded w-full p-2"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password:</label>
                <input
                  type="password"
                  required
                  className="border rounded w-full p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition w-[100%]"
              >
                Login
              </button>
            </form>
            <p className="mt-4">
              Don`t have an account?
              <button
                onClick={() => setShowRegistration(true)}
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
