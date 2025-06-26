import React, { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import InputField from "./shared/InputField";
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate

// Remove onSwitchToSignUp from props
const SignIn = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // <-- Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!formData.email.includes('@')) newErrors.email = 'Invalid email';

    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('Sign in successful!');
        onAuthSuccess();
        // The App.js's handleAuthSuccess now calls navigate('/')
        // So you don't need navigate here unless you want to override it.
        // For clarity, keep the navigation in App.js.
      }, 1500);
    }
  };

  return (
    <div className="auth-wrapper min-h-screen bg-white flex items-center justify-center p-4">
      <div className="auth-card bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-6">
            {/* Email Input */}
            <InputField
              icon={Mail}
              id="signin-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="Email Address"
            />

            {/* Password Field with Toggle Button */}
            <div>
              <label
                htmlFor="signin-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="flex items-center">
                <input
                  id="signin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="flex-1 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-10 h-10 px-2 bg-green-700 text-white rounded-md ml-2 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-700 text-white py-3 px-4 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don&#39;t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate('/signup')} // <-- Use navigate
              className="text-green-700 hover:text-green-600 font-medium focus:outline-none"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;