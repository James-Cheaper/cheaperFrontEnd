import { render, screen, fireEvent } from '@testing-library/react';
import AuthApp from './auth';

// Mock SignIn component with display name
jest.mock('./SignIn', () => {
  const MockSignIn = ({ onSwitchToSignUp, onAuthSuccess }) => (
    <div>
      <h2>Sign In Form</h2>
      <button onClick={onSwitchToSignUp}>Switch to Sign Up</button>
      <button onClick={onAuthSuccess}>Mock Sign In</button>
    </div>
  );
  MockSignIn.displayName = 'MockSignIn';
  return MockSignIn;
});

// Mock SignUp component with display name
jest.mock('./SignUp', () => {
  const MockSignUp = ({ onSwitchToSignIn, onAuthSuccess }) => (
    <div>
      <h2>Sign Up Form</h2>
      <button onClick={onSwitchToSignIn}>Switch to Sign In</button>
      <button onClick={onAuthSuccess}>Mock Sign Up</button>
    </div>
  );
  MockSignUp.displayName = 'MockSignUp';
  return MockSignUp;
});

describe('AuthApp', () => {
  const mockAuthSuccess = jest.fn();
  const mockSwitchForm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign-in form by default', () => {
    render(<AuthApp onAuthSuccess={mockAuthSuccess} />);
    expect(screen.getByText('Sign In Form')).toBeInTheDocument();
  });

  it('renders sign-up form when activeForm is "signup"', () => {
    render(
      <AuthApp 
        onAuthSuccess={mockAuthSuccess} 
        activeForm="signup"
      />
    );
    expect(screen.getByText('Sign Up Form')).toBeInTheDocument();
  });

  it('calls onSwitchForm when switching forms', () => {
    render(
      <AuthApp 
        onAuthSuccess={mockAuthSuccess}
        onSwitchForm={mockSwitchForm}
      />
    );
    
    fireEvent.click(screen.getByText('Switch to Sign Up'));
    expect(mockSwitchForm).toHaveBeenCalledWith('signup');
  });

  it('propagates auth success events', () => {
    render(<AuthApp onAuthSuccess={mockAuthSuccess} />);
    fireEvent.click(screen.getByText('Mock Sign In'));
    expect(mockAuthSuccess).toHaveBeenCalled();
  });
});