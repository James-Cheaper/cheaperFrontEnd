import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from './SignUp';
import '@testing-library/jest-dom';

// Mock useNavigate from react-router-dom as it's used in SignUp
// This is necessary because tests run in a Node.js environment, not a browser with a full router setup.
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('SignUp component', () => {
  beforeEach(() => {
    // Clear mock calls before each test to ensure isolation
    mockedUsedNavigate.mockClear();
  });

  test('renders all input fields and sign up button', () => {
    // SignUp component only expects onAuthSuccess prop now
    render(<SignUp onAuthSuccess={() => {}} />);

    // Use getByPlaceholderText as inputs use placeholders instead of labels
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument(); // Corrected from 'Email Address' to match component
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();

    // Check for the Sign Up button
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('shows error when password mismatch occurs on form submission', async () => {
    render(<SignUp onAuthSuccess={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Password123!' },
    });

    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'Mismatch!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Wait for the asynchronous state update after submission
    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  test('submits form successfully with valid data', async () => {
    // Mock the onAuthSuccess prop to check if it's called
    const mockOnAuthSuccess = jest.fn();
    render(<SignUp onAuthSuccess={mockOnAuthSuccess} />);

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Password123!' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Expect loading state change
    expect(screen.getByRole('button', { name: /Signing up.../i })).toBeInTheDocument();

    // Wait for the simulated async operation (setTimeout in SignUp.js) to complete
    await waitFor(() => {
      // Expect onAuthSuccess to have been called once
      expect(mockOnAuthSuccess).toHaveBeenCalledTimes(1);
    }, { timeout: 2000 }); // Adjust timeout if your setTimeout is longer
  });

  test('shows error for invalid email format on submission', async () => {
    render(<SignUp onAuthSuccess={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalid-email' } }); // Invalid email
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Password123!' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
    });
  });

  test('shows error for weak password on submission', async () => {
    render(<SignUp onAuthSuccess={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'weak' } }); // Weak password
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'weak' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 8 characters, include uppercase, lowercase, number, and symbol./i)).toBeInTheDocument();
    });
  });

  test('shows errors for empty required fields on submission', async () => {
    render(<SignUp onAuthSuccess={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i })); // Submit empty form

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test('navigates to signin page when "Sign in" button is clicked', () => {
    render(<SignUp onAuthSuccess={() => {}} />);

    const signInButton = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(signInButton);

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/signin');
  });
});