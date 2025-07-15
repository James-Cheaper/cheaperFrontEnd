import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "../SignIn"; // Adjust path as needed

describe("SignIn component", () => {
  const mockAuthSuccess = jest.fn();

  beforeEach(() => {
    render(<SignIn onAuthSuccess={mockAuthSuccess} />);
  });

  it("renders email and password input fields", () => {
    // Confirm email and password fields exist
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it("accepts user input", () => {
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("calls onAuthSuccess after valid submission", async () => {
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockAuthSuccess).toHaveBeenCalled();
    });
  });
});

