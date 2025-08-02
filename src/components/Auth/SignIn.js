import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Mail } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import "../../styles/auth.css";

const isStrongPassword = (password) => {
  // At least one lowercase, uppercase, digit, symbol, min 8 char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  return regex.test(password);
};

const SignIn = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (!isStrongPassword(formData.password)) {
      newErrors.password = 
        'Password must be at least 8 characters, include uppercase, lowercase, number, and symbol.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('Sign in successful!');
        onAuthSuccess && onAuthSuccess();
      }, 1500);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="text-center mb-8">
          <h1>Welcome Back</h1>
          <p>Please enter your email and password to Login</p>
        </div>

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-6">

            {/* EMAIL INPUT */}
            <div className="email-input-container">
              <input
                id="signin-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="login-email"
                required
              />
              <Mail className="email-icon-right" />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD INPUT */}
            <div className="password-input-container">
              <input
                id="signin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="login-password"
                required
              />
              <span
                className="password-icon"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                aria-label="Toggle password visibility"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' && setShowPassword(!showPassword)
                }
                data-testid="password-toggle"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="auth-submit-button"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => navigate('/forgotpassword')}
            className="forgot-password"
          >
            Forgot password?
          </button>

          <p className="text-sm text-gray-600">
            Don&#39;t have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="link-button"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;