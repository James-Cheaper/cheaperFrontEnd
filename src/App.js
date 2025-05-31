import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [featureNotification, setFeatureNotification] = useState("");

  useEffect(() => {
    // console.log("eBay token:", process.env.REACT_APP_EBAY_TOKEN); // Keep if needed for debugging env vars
  }, []);

  const handleSearch = (term) => {
    if (!term.trim()) { // Added .trim() to handle empty spaces
      setSearchResults([]); // Clear results if search term is empty
      setHasSearched(false); // Reset hasSearched if empty search
      return;
    }
    setIsSearching(true);
    setHasSearched(true);
    setSearchResults([]); // Clear previous results immediately on new search

    // Simulated API call
    setTimeout(() => {
      const mockResults = [
        { id: 1, title: `${term} Pro 2025`, price: "$499.99", site: "Alibaba" },
        { id: 2, title: `${term} Max Deluxe`, price: "$475.50", site: "eBay" },
        { id: 3, title: `${term} Lite Version`, price: "$510.00", site: "AliExpress" },
        { id: 4, title: `${term} Basic Model`, price: "$399.99", site: "Amazon" },
        { id: 5, title: `${term} Ultra 5G`, price: "$520.00", site: "eBay" }, // Added another eBay item
        { id: 6, title: `${term} Mini Edition`, price: "$450.00", site: "Walmart" }, // Added another site
      ];

      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="App">
      {/* Top Sticky Banner - NEW */}
      <div className="sticky-banner top-banner">
        <div className="banner-content">
          🚀 Free shipping on all orders over $50! 🚀
        </div>
      </div>

      <h1>Cheaper</h1>
      <p>Why Pay More? Let Cheaper Score! 😎</p> {/* Updated paragraph text */}

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch(searchTerm);
            }
          }}
        />
        <button className="search-button" onClick={() => handleSearch(searchTerm)}>
          🔍
        </button>
      </div>

      {isSearching && (
        <div className="loading">Searching for the best prices...</div>
      )}

      {!isSearching && hasSearched && (
        <div className="results-container">
          {searchResults.length > 0 ? (
            <>
              <h2 className="results-heading">Search Results</h2>
              {searchResults.map((result) => (
                <div key={result.id} className="result-item">
                  <div className="result-title">
                    <span
                      title={
                        result.site === "eBay"
                          ? `eBay: ${result.title} - ${result.price}`
                          : undefined
                      }
                    >
                      {result.title}
                    </span>
                  </div>
                  <div className="result-site">{result.site}</div>
                  <div style={{ color: "lightgreen", fontSize: "0.9rem", marginTop: 'auto' }}>
                    Free shipping
                  </div>
                  <div style={{ color: "gold", fontSize: "0.9rem" }}>
                    ★★★★☆ (24)
                  </div>
                  <div className="result-price">{result.price}</div>
                </div>
              ))}
            </>
          ) : (
            <div className="no-results">No results found. Try another search term.</div>
          )}
        </div>
      )}

      <button
        onClick={() =>
          setFeatureNotification("Comparison feature coming in our next update!")
        }
        aria-live="polite"
      >
        📊 Compare Across More Sites
      </button>

      {featureNotification && (
        <div className="feature-notification">
          {featureNotification}
          <button
            onClick={() => setFeatureNotification("")}
            aria-label="Close notification"
            className="close-btn"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default App;