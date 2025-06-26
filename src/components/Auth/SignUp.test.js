import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';
import '@testing-library/jest-dom';

describe('SignUp component', () => {
  test('renders all input fields', () => {
    render(<SignUp onSwitchToSignIn={() => {}} onAuthSuccess={() => {}} />);

    // Explicit label text or fallback to `getByLabelText` with selector
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();

    // Match password input by its associated label AND restrict to input
    expect(
      screen.getByLabelText('Password', { selector: 'input' })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('Confirm Password', { selector: 'input' })
    ).toBeInTheDocument();
  });

  test('shows error when password mismatch occurs', () => {
    render(<SignUp onSwitchToSignIn={() => {}} onAuthSuccess={() => {}} />);

    fireEvent.change(
      screen.getByLabelText('Password', { selector: 'input' }),
      {
        target: { value: 'Password123!' },
      }
    );

    fireEvent.change(
      screen.getByLabelText('Confirm Password', { selector: 'input' }),
      {
        target: { value: 'Mismatch!' },
      }
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });
});