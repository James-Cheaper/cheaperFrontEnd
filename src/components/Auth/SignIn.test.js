import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';

describe('SignIn component', () => {
  test('renders email and password input fields', () => {
    render(<SignIn onSwitchToSignUp={() => {}} onAuthSuccess={() => {}} />);

    // ✅ Match by label and limit to input field
    const emailInput = screen.getByLabelText('Email Address', { selector: 'input' });
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});

