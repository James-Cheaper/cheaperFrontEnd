import React, { useState, useEffect } from "react";
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
// Removed: import CookieConsent from "react-cookie-consent";
import "./App.css";

// ✅ Inner app component with navigation logic
function AppWithNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // State to manage visibility of our custom cookie banner
  const [showCustomCookieBanner, setShowCustomCookieBanner] = useState(false);

  const navigate = useNavigate();

  // Check for cookie consent on component mount
  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsentGiven");
    if (consentGiven !== "true") {
      setShowCustomCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsentGiven", "true");
    setShowCustomCookieBanner(false);
  };

  const handleDeclineCookies = () => {
    // For simplicity, declining also hides the banner.
    // In a real app, you might want to set a different preference or redirect.
    localStorage.setItem("cookieConsentGiven", "declined"); // Store 'declined'
    setShowCustomCookieBanner(false);
  };

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
      {/* --- CUSTOM COOKIE BANNER --- */}
      {showCustomCookieBanner && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            backgroundColor: "#222", // Dark background
            color: "white",
            padding: "0.2em 0.5em", // Vertical padding for a thin banner
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center", // Vertically center items
            justifyContent: "center",
            gap: "1em", // Gap between text and buttons
            zIndex: 99999,
            boxShadow: "0 -2px 10px rgba(0,0,0,0.5)",
          }}
        >
          <span style={{ fontSize: "0.85em", fontWeight: 500, flexShrink: 0 }}>
            We use cookies to improve your experience.
          </span>
          <div
            style={{
              display: "flex",
              gap: "0.6em", // Gap between buttons
              flexShrink: 0,
              position: "relative", // Added position relative
              top: "-0.9em",       // Moved buttons up slightly using 'top'
            }}
          >
            <button
              onClick={handleAcceptCookies}
              style={{
                background: "#2196F3", // Blue for Accept
                color: "#fff",
                borderRadius: "20px",
                padding: "0.5em 0.8em", // Button padding
                fontWeight: "bold",
                border: "none",
                // CHANGE START: Made font size identical to Decline button
                fontSize: "0.8em",
                // CHANGE END
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            >
              Accept
            </button>
            <button
              onClick={handleDeclineCookies}
              style={{
                background: "#F44336", // Red for Decline
                color: "#fff",
                borderRadius: "20px",
                padding: "0.3em 0.8em", // Button padding
                fontWeight: "bold",
                border: "none",
                fontSize: "0.8em", // Button font size
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            >
              Decline
            </button>
          </div>
        </div>
      )}
      {/* --- /CUSTOM COOKIE BANNER --- */}

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