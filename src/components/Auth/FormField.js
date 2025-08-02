import React from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Assuming lucide-react for icons

const FormField = ({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  error,
  // icon: IconComponent, // Removed as Mail icon was removed from SignUp
  isPasswordToggle = false,
  showPassword = false,
  togglePasswordVisibility,
  inputClassName, // Class for the <input> element itself
  containerClassName, // Class for the outer <div> container
  ...rest // For other props like 'required'
}) => {
  // Determine the actual input type (text/password) based on toggle state
  const inputType = isPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    // Use containerClassName if provided, otherwise a generic one or empty string
    <div className={containerClassName || (isPasswordToggle ? "password-input-container" : "")}>
      <input
        id={id}
        name={name}
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
      />
      {/* Icon for password toggle */}
      {isPasswordToggle && (
        <button
          type="button" // Important: Prevents button from submitting the form
          onClick={togglePasswordVisibility}
          className="password-toggle-icon-button"
          aria-label={showPassword ? `Hide ${name} password` : `Show ${name} password`}
          data-testid={`${name}-toggle`} // Good for testing
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      )}
      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;