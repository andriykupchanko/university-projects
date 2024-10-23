import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';

const RegistrationLink: React.FC = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleRegistrationClick = () => {
    setShowRegistration(!showRegistration);
  };

  return (
    <div>
      <button onClick={handleRegistrationClick}>Register</button>
      {showRegistration && <RegistrationForm onClose={function (): void {
        throw new Error('Function not implemented.');
      } } />}
    </div>
  );
};

export default RegistrationLink;
