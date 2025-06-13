import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./CookieBanner.css";

function CookieBanner({ show, onAccept, onDecline, onDismiss }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (show && bannerRef.current) {
      bannerRef.current.focus();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="sticky-banner bottom-banner"
      data-testid="cookie-banner"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie usage notification"
      tabIndex="-1"
      ref={bannerRef}
    >
      <span className="banner-message">
        We use cookies to improve your experience.
      </span>
      <div className="button-group">
        <button
          className="accept-btn"
          onClick={onAccept}
          aria-label="Accept cookies"
        >
          Accept
        </button>
        <button
          className="decline-btn"
          onClick={onDecline}
          aria-label="Decline cookies"
        >
          Decline
        </button>
        <button
          aria-label="Close cookie banner"
          onClick={onDismiss}
          className="close-btn"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

CookieBanner.propTypes = {
  show: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default CookieBanner;