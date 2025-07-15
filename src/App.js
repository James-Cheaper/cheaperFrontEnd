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
import CookieConsent from "react-cookie-consent";
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
      {/* --- COOKIE BANNER: always visible at bottom until user accepts/declines --- */}
      {/*
        To place the "Accept" button before the "Decline" button,
        we are swapping the `buttonText` and `declineButtonText` values.
        We are also swapping their respective `buttonStyle` and `declineButtonStyle`
        to ensure the correct visual styling (blue for Accept, red for Decline)
        is maintained for the *role* of the button, regardless of its position.

        This assumes that the `react-cookie-consent` library renders the button
        associated with `declineButtonText` first when `enableDeclineButton` is true,
        followed by the button associated with `buttonText`.
      */}
      <CookieConsent
        // The button that appears first (visually on the left) will now be "Accept"
        // This is done by assigning "Accept" to `declineButtonText`
        declineButtonText="Accept"
        // The button that appears second (visually on the right) will now be "Decline"
        // This is done by assigning "Decline" to `buttonText`
        buttonText="Decline"
        enableDeclineButton
        style={{
          background: "#222",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: ".1em 0"
        }}
        contentStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "0.1em",
          margin: 0,
          padding: 0,
        }}
        // Apply the style for "Accept" to the `declineButtonStyle` prop,
        // as this prop now controls the "Accept" button's appearance.
        declineButtonStyle={{
          background: "#2196F3", // Blue for Accept
          color: "#fff",
          marginLeft: "0.6em", // Added left margin to bring the buttons in
          marginRight: "0.6em", // Increased right margin for more spacing after "Accept"
          borderRadius: "20px",
          padding: "0.4em 1.2em",
          fontWeight: "bold",
          border: "none",
          fontSize: "1em",
          cursor: "pointer"
        }}
        // Apply the style for "Decline" to the `buttonStyle` prop,
        // as this prop now controls the "Decline" button's appearance.
        buttonStyle={{
          background: "#F44336", // Red for Decline
          color: "#fff",
          marginLeft: 0, // No left margin for the second button in the pair
          borderRadius: "20px",
          padding: "0.4em 1.2em",
          fontWeight: "bold",
          border: "none",
          fontSize: "1em",
          cursor: "pointer"
        }}
      >
        <span style={{ textAlign: "center", fontWeight: 500 }}>
          We use cookies to improve your experience.
        </span>
      </CookieConsent>
      {/* --- /COOKIE BANNER --- */}

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

