import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppWithNavigation } from './App'; // Exports inner component with Routes

// ✅ Mock SignIn
jest.mock('./components/Auth/SignIn', () => ({
  __esModule: true,
  default: ({ onAuthSuccess }) => (
    <div>
      Mock SignIn Page
      <button onClick={onAuthSuccess} data-testid="signin-success-btn">
        Sign In Success
      </button>
    </div>
  ),
}));

// ✅ Mock SignUp
jest.mock('./components/Auth/SignUp', () => ({
  __esModule: true,
  default: ({ onAuthSuccess }) => (
    <div>
      Mock SignUp Page
      <button onClick={onAuthSuccess} data-testid="signup-success-btn">
        Sign Up Success
      </button>
    </div>
  ),
}));

// ✅ Mock MainApp
jest.mock('./MainApp', () => ({
  __esModule: true,
  default: ({ onSignOut }) => (
    <div>
      Mock MainApp
      <button onClick={onSignOut} data-testid="signout-btn">
        Sign Out
      </button>
    </div>
  ),
}));

// ✅ Helper to render AppWithNavigation with any path
const renderAppWithPath = (initialPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AppWithNavigation />
    </MemoryRouter>
  );
};

describe('App routing and auth behavior', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('redirects unauthenticated users to /signin', () => {
    renderAppWithPath('/');
    expect(screen.getByText(/Mock SignIn Page/i)).toBeInTheDocument();
  });

  test('shows SignIn at /signin when unauthenticated', () => {
    renderAppWithPath('/signin');
    expect(screen.getByText(/Mock SignIn Page/i)).toBeInTheDocument();
  });

  test('shows SignUp at /signup when unauthenticated', () => {
    renderAppWithPath('/signup');
    expect(screen.getByText(/Mock SignUp Page/i)).toBeInTheDocument();
  });

  test('renders MainApp when authenticated', () => {
    localStorage.setItem('isAuthenticated', 'true');
    renderAppWithPath('/');
    expect(screen.getByText(/Mock MainApp/i)).toBeInTheDocument();
  });

  test('signs in and loads MainApp', async () => {
    renderAppWithPath('/signin');
    expect(screen.getByText(/Mock SignIn Page/i)).toBeInTheDocument();
    const button = screen.getByTestId('signin-success-btn');

    await act(async () => {
      button.click();
    });

    expect(screen.getByText(/Mock MainApp/i)).toBeInTheDocument();
    expect(localStorage.getItem('isAuthenticated')).toBe('true');
  });

  test('signs up and loads MainApp', async () => {
    renderAppWithPath('/signup');
    const button = screen.getByTestId('signup-success-btn');

    await act(async () => {
      button.click();
    });

    expect(screen.getByText(/Mock MainApp/i)).toBeInTheDocument();
    expect(localStorage.getItem('isAuthenticated')).toBe('true');
  });

  test('signs out and redirects to SignIn', async () => {
    localStorage.setItem('isAuthenticated', 'true');
    renderAppWithPath('/');
    const button = screen.getByTestId('signout-btn');

    await act(async () => {
      button.click();
    });

    expect(screen.getByText(/Mock SignIn Page/i)).toBeInTheDocument();
    expect(localStorage.getItem('isAuthenticated')).toBeNull();
  });

  test('unauthenticated route fallback shows SignIn', () => {
    renderAppWithPath('/nonexistent');
    expect(screen.getByText(/Mock SignIn Page/i)).toBeInTheDocument();
  });

  test('authenticated user sees MainApp at any route', () => {
    localStorage.setItem('isAuthenticated', 'true');
    renderAppWithPath('/anything');
    expect(screen.getByText(/Mock MainApp/i)).toBeInTheDocument();
  });
});

