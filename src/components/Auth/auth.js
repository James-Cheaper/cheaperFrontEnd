import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthApp = ({ 
  onAuthSuccess, 
  activeForm = 'signin',
  onSwitchForm = () => {}
}) => {
  const [currentView, setCurrentView] = useState(activeForm);

  const handleSwitch = (formType) => {
    setCurrentView(formType);
    onSwitchForm(formType);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
      data-testid="auth-container"
    >
      {currentView === 'signin' ? (
        <SignIn
          onSwitchToSignUp={() => handleSwitch('signup')}
          onAuthSuccess={onAuthSuccess}
        />
      ) : (
        <SignUp
          onSwitchToSignIn={() => handleSwitch('signin')}
          onAuthSuccess={onAuthSuccess}
        />
      )}
    </div>
  );
};

export default AuthApp;