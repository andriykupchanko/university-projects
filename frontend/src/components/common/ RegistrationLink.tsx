import React, { useState } from "react";

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch("http://your-backend-url/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          login,
          password
        })
      });

      if (!response.ok) throw new Error("Registration failed");

      const data = await response.json();
      console.log("Registration successful", data);
      onClose(); // Закриваємо форму після успішної реєстрації
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded shadow-md relative">
      <h2 className="text-xl font-bold">Registration</h2>
      <form onSubmit={handleRegister} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-1">First Name:</label>
          <input
            type="text"
            required
            className="border rounded w-full p-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Last Name:</label>
          <input
            type="text"
            required
            className="border rounded w-full p-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4 col-span-2">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            required
            className="border rounded w-full p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
        <div className="mb-4 col-span-2">
          <label className="block mb-1">Repeat Password:</label>
          <input
            type="password"
            required
            className="border rounded w-full p-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="col-span-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
