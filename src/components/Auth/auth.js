import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthApp = ({ onAuthSuccess }) => {
  const [currentView, setCurrentView] = useState('signin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {currentView === 'signin' ? (
        <SignIn
          onSwitchToSignUp={() => setCurrentView('signup')}
          onAuthSuccess={onAuthSuccess}
        />
      ) : (
        <SignUp
          onSwitchToSignIn={() => setCurrentView('signin')}
          onAuthSuccess={onAuthSuccess}
        />
      )}
    </div>
  );
};

export default AuthApp;
