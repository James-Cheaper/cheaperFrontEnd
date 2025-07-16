import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import SignIn from "./SignIn";

// Mock useNavigate from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe("SignIn component", () => {
  const mockAuthSuccess = jest.fn();
  let originalAlert;

  beforeAll(() => {
    // Store original alert and mock it
    originalAlert = window.alert;
    window.alert = jest.fn();

    // Enable fake timers
    jest.useFakeTimers();
  });

  afterAll(() => {
    // Restore original alert and timers
    window.alert = originalAlert;
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockAuthSuccess.mockClear();
    mockedUsedNavigate.mockClear();
    window.alert.mockClear();
    jest.clearAllTimers();

    render(<SignIn onAuthSuccess={mockAuthSuccess} />);
  });

  it("renders email and password input fields", () => {
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it("accepts user input", () => {
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("Password123!");
  });

  it("calls onAuthSuccess after valid submission", async () => {
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "Password123!" },
    });

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    expect(loginButton).toBeDisabled();

    // Wrap timer advance in act to avoid React warnings
    await act(() => {
      jest.advanceTimersByTime(1500);
      return Promise.resolve(); // to ensure all microtasks finish
    });

    await waitFor(() => {
      expect(loginButton).toBeEnabled();
      expect(mockAuthSuccess).toHaveBeenCalledTimes(1);
    });

    expect(window.alert).toHaveBeenCalledWith('Sign in successful!');
  });

  it('navigates to /signup when "Register" button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup');
  });
});

