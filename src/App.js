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
    // Trim the search term to handle cases with only spaces
    const trimmedTerm = term.trim();

    // Set `isSearching` to true and `hasSearched` to true immediately
    // to show loading spinner and indicate a search has begun.
    setIsSearching(true);
    setHasSearched(true);
    // Clear previous results as a new search is initiated
    setSearchResults([]);

    // If the trimmed search term is empty, handle it without making an "API call"
    if (!trimmedTerm) {
      // Immediately set `isSearching` to false because no actual network request is needed
      setIsSearching(false);
      // `hasSearched` remains true, `searchResults` is already empty,
      // which will cause the "No results found." message to display.
      return; // Exit the function early
    }

    // Simulate an API call for non-empty search terms
    // This setTimeout represents the network latency and data fetching
    setTimeout(() => {
      // Mock search results based on the trimmed term
      const mockResults = [
        { id: 1, title: `${trimmedTerm} Pro 2025`, price: "$499.99", site: "Alibaba" },
        { id: 2, title: `${trimmedTerm} Max Deluxe`, price: "$475.50", site: "eBay" },
        { id: 3, title: `${trimmedTerm} Lite Version`, price: "$510.00", site: "AliExpress" },
        { id: 4, title: `${trimmedTerm} Basic Model`, price: "$399.99", site: "Amazon" },
        { id: 5, title: `${trimmedTerm} Ultra 5G`, price: "$520.00", site: "eBay" },
        { id: 6, title: `${trimmedTerm} Mini Edition`, price: "$450.00", site: "Walmart" },
      ];

      // Update the search results state with mock data
      setSearchResults(mockResults);
      // Set `isSearching` to false as the "API call" has completed
      setIsSearching(false);
    }, 1000); // Simulate a 1-second delay
  };

  return (
    <div className="App">
      {/* Top Sticky Banner for promotions */}
      <div className="sticky-banner top-banner">
        <div className="banner-content">
          🚀 Free shipping on all orders over $50! 🚀
        </div>
      </div>

      {/* Main application heading */}
      <h1>Cheaper</h1>
      {/* Catchy subheading/slogan */}
      <p>Why Pay More? Let Cheaper Score! 😎</p>

      {/* Search input container */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            // Trigger search when Enter key is pressed
            if (e.key === "Enter") handleSearch(searchTerm);
          }}
        />
        <button
          className="search-button"
          onClick={() => handleSearch(searchTerm)}
          aria-label="Search" // Accessibility label for the search button
        >
          🔍 {/* Magnifying glass icon */}
        </button>
      </div>

      {/* Conditional rendering for loading state */}
      {isSearching && (
        <div className="loading">Searching for the best prices...</div>
      )}

      {/* Conditional rendering for search results or "no results" message */}
      {/* This block renders only after a search has been initiated and is not currently loading */}
      {!isSearching && hasSearched && (
        <div className="results-container">
          {searchResults.length > 0 ? (
            <>
              {/* Heading for search results, spanning grid columns */}
              <h2 className="results-heading">Search Results</h2>
              {/* Map through searchResults to display individual items */}
              {searchResults.map((result) => (
                <div key={result.id} className="result-item">
                  <div className="result-title">
                    {/* Display product title with a native tooltip for eBay items */}
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
                  {/* Display the site where the product was found */}
                  <div className="result-site">{result.site}</div>
                  {/* Additional information like "Free shipping" with inline styling */}
                  <div
                    style={{
                      color: "lightgreen",
                      fontSize: "0.9rem",
                      marginTop: "auto", // Pushes this element to the bottom within its flex container
                    }}
                  >
                    Free shipping
                  </div>
                  {/* Mock rating/reviews with inline styling */}
                  <div style={{ color: "gold", fontSize: "0.9rem" }}>
                    ★★★★☆ (24)
                  </div>
                  {/* Display the product price */}
                  <div className="result-price">{result.price}</div>
                </div>
              ))}
            </>
          ) : (
            // Display "No results found" message if search has completed and no results are found
            <div className="no-results">
              No results found. Try another search term.
            </div>
          )}
        </div>
      )}

      {/* Button for future comparison feature */}
      <button
        onClick={() =>
          setFeatureNotification(
            "Comparison feature coming in our next update!"
          )
        }
        aria-live="polite" // Announce changes to screen readers
      >
        📊 Compare Across More Sites
      </button>

      {/* Feature notification display */}
      {featureNotification && (
        <div className="feature-notification">
          {featureNotification}
          <button
            onClick={() => setFeatureNotification("")}
            aria-label="Close notification" // Accessibility label for the close button
            className="close-btn" // Specific class for close button styling
          >
            × {/* Close icon */}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;