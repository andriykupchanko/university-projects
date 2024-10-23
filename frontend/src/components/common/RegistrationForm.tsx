import React from 'react';

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  return (
    <div className="mt-4 p-4 border rounded shadow-md relative">      
      <h2 className="text-xl font-bold">Registration</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1">First Name:</label>
          <input
            type="text"
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Last Name:</label>
          <input
            type="text"
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Login:</label>
          <input
            type="text"
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
        <div className="mb-4">
          <label className="block mb-1">Repeat Password:</label>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
