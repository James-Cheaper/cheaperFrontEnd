import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';

jest.useFakeTimers();


test('renders Cheaper heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Cheaper/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders Find the best prices text', () => {
  render(<App />);
  const textElement = screen.getByText(/Find the best prices across websites!/i);
  expect(textElement).toBeInTheDocument();
});

test('renders search bar', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search for products.../i);
  expect(searchInput).toBeInTheDocument();
});

test('renders search button', () => {
  render(<App />);
  const searchButton = screen.getByRole('button', { name: /Search/i });
  expect(searchButton).toBeInTheDocument();
});

jest.useFakeTimers();

describe('App Component', () => {
  test('should update states and call setSearchResults after API simulation', async () => {
    render(<App />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'Laptop' } });
    fireEvent.click(screen.getByText(/search/i));
    //simulate api call response and recieve
    jest.advanceTimersByTime(1000);

    // Wait for elements to render
    const results = await screen.findAllByText(/Laptop X/i);

    expect(results).toHaveLength(3);
    expect(results[0]).toHaveTextContent('Laptop X');
    expect(results[1]).toHaveTextContent('Laptop X');
    expect(results[2]).toHaveTextContent('Laptop X');
  });
  test('feature notif on click' , () => {
    render(<App />);
    
    fireEvent.click(screen.getByText(/Compare Across More Sites/i));

    expect(screen.getByText('Comparison feature coming in our next update!')).toBeInTheDocument();
   
  })
});
