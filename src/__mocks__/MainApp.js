import React, { useState } from "react";
import CookieBanner from "./components/Auth/CookieBanner";

function MainApp({ onSignOut }) {
  const [showCookieBanner, setShowCookieBanner] = useState(true); // ✅ Add this

  const handleAccept = () => {
    //console.log("Cookies accepted");
    setShowCookieBanner(false);
  };

  const handleDecline = () => {
   // console.log("Cookies declined");
    setShowCookieBanner(false);
  };

  const handleDismiss = () => {
   // console.log("Banner dismissed");
    setShowCookieBanner(false);
  };

  return (
    <div>
      <h1>Welcome to the app!</h1>
      <button onClick={onSignOut}>Sign Out</button>

      {/* ✅ Inject banner at the bottom */}
      <CookieBanner
        show={showCookieBanner}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onDismiss={handleDismiss}
      />
    </div>
  );
}

export default MainApp;