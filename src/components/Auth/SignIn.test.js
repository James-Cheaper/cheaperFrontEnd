import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "../SignIn"; // Adjust path as needed

// Mock useNavigate from react-router-dom as it's used in SignIn.js
// This is crucial because tests don't run in a browser environment with a router context.
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe("SignIn component", () => {
  const mockAuthSuccess = jest.fn();
  let originalAlert;

  beforeAll(() => {
    // Store original alert and mock it to prevent test failures
    originalAlert = window.alert;
    window.alert = jest.fn();

    // Enable Jest's fake timers for consistent handling of setTimeout
    jest.useFakeTimers();
  });

  afterAll(() => {
    // Restore original alert after all tests are done
    window.alert = originalAlert;

    // Restore real timers after all tests are done
    jest.useRealTimers();
  });

  beforeEach(() => {
    // Clear mocks before each test to ensure isolation
    mockAuthSuccess.mockClear();
    mockedUsedNavigate.mockClear();
    window.alert.mockClear(); // Clear alert mock too

    // Reset timers before each test
    jest.runOnlyPendingTimers(); // Run any timers left from previous tests (shouldn't be any with proper cleanup)
    jest.clearAllTimers(); // Clear all active timers

    render(<SignIn onAuthSuccess={mockAuthSuccess} />);
  });

  it("renders email and password input fields", () => {
    // Use getByPlaceholderText for email as it doesn't have a direct label in SignIn.js
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    // getByLabelText works for password because there's an explicit label
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    // Correct button name: "Sign In"
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it("accepts user input", () => {
    // Use getByPlaceholderText for email
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("calls onAuthSuccess after valid submission", async () => {
    // Use getByPlaceholderText for email
    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Correct button name: "Sign In"
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Assert that the button text changes to "Signing in..." immediately after click
    expect(screen.getByRole("button", { name: /signing in\.\.\./i })).toBeInTheDocument();

    // Advance timers by the duration of the setTimeout in SignIn.js (1500ms)
    jest.advanceTimersByTime(1500);

    // Now, the setTimeout callback should have executed.
    // Wait for the button text to revert to "Sign In" and mockAuthSuccess to be called.
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
      expect(mockAuthSuccess).toHaveBeenCalledTimes(1);
    });

    // Optionally, check if alert was called (if you decide to keep it for now)
    expect(window.alert).toHaveBeenCalledWith('Sign in successful!');
  });

  it('navigates to /signup when "Sign up" button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup');
  });
});



