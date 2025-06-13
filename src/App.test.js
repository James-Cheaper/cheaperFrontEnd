import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'; // Import waitFor
import App from './App';
import React from 'react';

// Use fake timers to control setTimeout
jest.useFakeTimers();

// Test for the main heading
test('renders Cheaper heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Cheaper/i });
  expect(headingElement).toBeInTheDocument();
});

// Test for the subheading/slogan
test('renders Why Pay More? Let Cheaper Score! 😎', () => {
  render(<App />);
  const subheading = screen.getByText(/Why Pay More\? Let Cheaper Score! 😎/i);
  expect(subheading).toBeInTheDocument();
});

// Test for the search input bar
test('renders search bar', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Search for a product/i);
  expect(input).toBeInTheDocument();
});

// Test for the search button
test('renders search button', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /Search/i });
  expect(button).toBeInTheDocument();
});

// Describe block for App Component tests
describe('App Component', () => {
  // Test for state updates and API simulation
  test('should update states and display results after API simulation', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search for a product/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    // 1. Simulate typing a search term
    fireEvent.change(searchInput, { target: { value: 'Laptop' } });

    // 2. Simulate clicking the search button
    fireEvent.click(searchButton);

    // Expect loading message to appear immediately
    expect(screen.getByText(/Searching for the best prices.../i)).toBeInTheDocument();
    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument(); // Ensure no-results is not visible yet

    // 3. Advance timers by 1000ms to simulate API response time
    // Use act to ensure all state updates and re-renders from the timeout are processed
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // 4. Assert states after API simulation
    // Use waitFor to wait for the loading message to disappear and results to appear
    await waitFor(() => {
      expect(screen.queryByText(/Searching for the best prices.../i)).not.toBeInTheDocument();
    });

    // Expect the "Search Results" heading to be present
    expect(screen.getByRole('heading', { name: /Search Results/i })).toBeInTheDocument();

    // Expect the correct number of result items (based on mockResults in App.js)
    // You can search for a common part of the title or the result-item class if your mock data is dynamic
    const resultItems = screen.getAllByText(/Laptop/i); // Search for "Laptop" in any title
    expect(resultItems).toHaveLength(6); // Expect 6 results based on your mock data

    // Optionally, check for specific parts of the titles to confirm data structure
    expect(screen.getByText(/Laptop Pro 2025/i)).toBeInTheDocument();
    expect(screen.getByText(/Laptop Max Deluxe/i)).toBeInTheDocument();
    expect(screen.getByText(/Laptop Lite Version/i)).toBeInTheDocument();
    expect(screen.getByText(/Laptop Basic Model/i)).toBeInTheDocument();
    expect(screen.getByText(/Laptop Ultra 5G/i)).toBeInTheDocument();
    expect(screen.getByText(/Laptop Mini Edition/i)).toBeInTheDocument();

    // Verify other content elements if needed (e.g., prices, sites)
    expect(screen.getByText('$499.99')).toBeInTheDocument();
    expect(screen.getByText('Alibaba')).toBeInTheDocument();
  });

  // Test for feature notification display on button click
  test('feature notif on click', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Compare Across More Sites/i));
    expect(screen.getByText('Comparison feature coming in our next update!')).toBeInTheDocument();
    // Verify the close button is present
    expect(screen.getByLabelText('Close notification')).toBeInTheDocument();
  });

  // Optional: Test for empty search term
  test('should clear results and reset hasSearched for empty search term', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search for a product/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    // First, perform a search to get results
    fireEvent.change(searchInput, { target: { value: 'Test' } });
    fireEvent.click(searchButton);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getAllByText(/Test/i)).toHaveLength(6); // Ensure results are there

    // Now, simulate an empty search
    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.click(searchButton);

    // Expect no results to be displayed and no-results message to appear
    expect(screen.queryByRole('heading', { name: /Search Results/i })).not.toBeInTheDocument();
    expect(screen.getByText(/No results found\. Try another search term\./i)).toBeInTheDocument();
  });
});

