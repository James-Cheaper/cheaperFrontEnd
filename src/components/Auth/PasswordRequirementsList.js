import React from 'react';

const PasswordRequirementsList = ({ requirements }) => {
  return (
    <div className="password-composition-list mt-2">
      <p className={`text-sm flex items-center ${requirements.minLength ? "text-green-600" : "text-red-600"}`}>
        {requirements.minLength ? '✓' : '✗'}{" "}8 Characters
      </p>
      <p className={`text-sm flex items-center ${requirements.hasUppercase ? "text-green-600" : "text-red-600"}`}>
        {requirements.hasUppercase ? '✓' : '✗'}{" "}1 Uppercase Letter
      </p>
      <p className={`text-sm flex items-center ${requirements.hasLowercase ? "text-green-600" : "text-red-600"}`}>
        {requirements.hasLowercase ? '✓' : '✗'}{" "}1 Lowercase Letter
      </p>
      <p className={`text-sm flex items-center ${requirements.hasNumber ? "text-green-600" : "text-red-600"}`}>
        {requirements.hasNumber ? '✓' : '✗'}{" "}1 Number
      </p>
      <p className={`text-sm flex items-center ${requirements.hasSymbol ? "text-green-600" : "text-red-600"}`}>
        {requirements.hasSymbol ? '✓' : '✗'}{" "}1 Symbol
      </p>
    </div>
  );
};

export default PasswordRequirementsList;