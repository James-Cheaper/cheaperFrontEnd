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

function AppWithNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    navigate("/");
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/signin");
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
            <Route path="/*" element={<Navigate to="/signin" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWithNavigation />
    </Router>
  );
}

export { AppWithNavigation };
export default App;
