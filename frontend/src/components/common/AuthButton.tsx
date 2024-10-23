import React, { useState } from 'react';
import LoginForm from './LoginForm';

const AuthButton: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleButtonClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Auth
      </button>
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default AuthButton;
