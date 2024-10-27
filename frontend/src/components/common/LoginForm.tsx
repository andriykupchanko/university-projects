import React, { useState } from "react";
import  RegistrationLink from "./RegistrationLink";

interface LoginFormProps {
  onClose: () => void;
  onLogin: () => void; // Додайте пропс для обробки успішного логіну
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onLogin }) => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Локальна перевірка логіна та пароля
    if (login === "admin" && password === "admin") {
      console.log("Login successful");
      onLogin(); // Виклик функції для оновлення стану аутентифікації
      onClose(); // Закриваємо форму після успішного логіну
    } else {
      console.error("Invalid login or password");
      // Тут можна додати відображення повідомлення про помилку
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
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
              >
                Login
              </button>
            </form>
            <p className="mt-4">
              Don’t have an account?
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
