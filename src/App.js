import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import MainApp from "./MainApp";
import "./App.css";

// ✅ Inner app component with navigation logic
function AppWithNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    navigate("/", { replace: true });
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/signin", { replace: true });
  };

  return (
    <div className="App">
      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<MainApp onSignOut={handleSignOut} />} />
        ) : (
          <>
            <Route
              path="/signin"
              element={<SignIn onAuthSuccess={handleAuthSuccess} />}
            />
            <Route
              path="/signup"
              element={<SignUp onAuthSuccess={handleAuthSuccess} />}
            />
            <Route path="/*" element={<Navigate to="/signin" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
}

// ✅ Main App component with dynamic key to force re-mount
function App() {
  return (
    <Router>
      {/* 👇 Forces AppWithNavigation to re-mount if localStorage changes */}
      <AppWithNavigation key={localStorage.getItem("isAuthenticated")} />
    </Router>
  );
}

export { AppWithNavigation };
export default App;
