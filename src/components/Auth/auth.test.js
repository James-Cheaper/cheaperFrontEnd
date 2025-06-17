import { render, screen } from '@testing-library/react';
import AuthApp from './auth';

describe('AuthApp', () => {
  it('renders sign-in form by default', () => {
    render(
      <AuthApp 
        onAuthSuccess={() => {}} 
        activeForm="signin"
        onSwitchForm={() => {}}
      />
    );
    
    // Verify sign-in form elements are present
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('renders sign-up form when activeForm is "signup"', () => {
    render(
      <AuthApp 
        onAuthSuccess={() => {}} 
        activeForm="signup"
        onSwitchForm={() => {}}
      />
    );
    
    // Verify sign-up form elements are present
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  });

  it('calls onSwitchForm when switching forms', () => {
    const mockSwitchForm = jest.fn();
    render(
      <AuthApp 
        onAuthSuccess={() => {}} 
        activeForm="signin"
        onSwitchForm={mockSwitchForm}
      />
    );
    
    // Simulate clicking the "Sign up" link
    screen.getByText(/Don't have an account/i).click();
    
    // Verify the callback was called with correct argument
    expect(mockSwitchForm).toHaveBeenCalledWith('signup');
  });
});
