import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppWithNavigation } from './App';

// Mock the CSS import to avoid issues
jest.mock('./App.css', () => ({}));

// Mock SignIn component
jest.mock('./components/Auth/SignIn', () => ({
  __esModule: true,
  default: function MockSignIn({ onAuthSuccess }) {
    return (
      <div>
        Mock SignIn Page
        <button onClick={onAuthSuccess} data-testid="signin-success-btn">
          Sign In Success
        </button>
      </div>
    );
  }
}));

// Mock SignUp component
jest.mock('./components/Auth/SignUp', () => ({
  __esModule: true,
  default: function MockSignUp({ onAuthSuccess }) {
    return (
      <div>
        Mock SignUp Page
        <button onClick={onAuthSuccess} data-testid="signup-success-btn">
          Sign Up Success
        </button>
      </div>
    );
  }
}));

// Mock MainApp component
jest.mock('./MainApp', () => ({
  __esModule: true,
  default: function MockMainApp({ onSignOut }) {
    return (
      <div>
        Mock MainApp
        <button onClick={onSignOut} data-testid="signout-btn">
          Sign Out
        </button>
      </div>
    );
  }
}));

const renderWithRouter = (ui, { initialPath = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      {ui}
    </MemoryRouter>
  );
};

describe('App routing and auth behavior', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders /signin route directly', async () => {
    renderWithRouter(<AppWithNavigation />, { initialPath: '/signin' });
    expect(await screen.findByText(/Mock SignIn Page/i)).toBeInTheDocument();
  });

  test('shows SignIn at /signin when unauthenticated', async () => {
    renderWithRouter(<AppWithNavigation />, { initialPath: '/signin' });
    expect(await screen.findByText(/Mock SignIn Page/i)).toBeInTheDocument();
  });

  test('shows SignUp at /signup when unauthenticated', async () => {
    renderWithRouter(<AppWithNavigation />, { initialPath: '/signup' });
    expect(await screen.findByText(/Mock SignUp Page/i)).toBeInTheDocument();
  });

  test('renders MainApp when authenticated', async () => {
    await act(async () => {
      localStorage.setItem('isAuthenticated', 'true');
      renderWithRouter(<AppWithNavigation />);
    });
    expect(await screen.findByText(/Mock MainApp/i)).toBeInTheDocument();
  });

  test('signs in and loads MainApp', async () => {
    renderWithRouter(<AppWithNavigation />, { initialPath: '/signin' });
    expect(await screen.findByText(/Mock SignIn Page/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByTestId('signin-success-btn'));
    });

    expect(await screen.findByText(/Mock MainApp/i)).toBeInTheDocument();
    expect(localStorage.getItem('isAuthenticated')).toBe('true');
  });

  test('signs up and loads MainApp', async () => {
    renderWithRouter(<AppWithNavigation />, { initialPath: '/signup' });
    expect(await screen.findByText(/Mock SignUp Page/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByTestId('signup-success-btn'));
    });

    expect(await screen.findByText(/Mock MainApp/i)).toBeInTheDocument();
    expect(localStorage.getItem('isAuthenticated')).toBe('true');
  });

  test('signs out and redirects to SignIn', async () => {
    await act(async () => {
      localStorage.setItem('isAuthenticated', 'true');
      renderWithRouter(<AppWithNavigation />);
    });

    expect(await screen.findByText(/Mock MainApp/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByTestId('signout-btn'));
    });

    expect(await screen.findByText(/Mock SignIn Page/i)).toBeInTheDocument();
    expect(localStorage.getItem('isAuthenticated')).toBeNull();
  });

  test('unauthenticated route fallback shows SignIn', async () => {
    renderWithRouter(<AppWithNavigation />, { initialPath: '/nonexistent' });
    expect(await screen.findByText(/Mock SignIn Page/i)).toBeInTheDocument();
  });

  test('authenticated user sees MainApp at any route', async () => {
    await act(async () => {
      localStorage.setItem('isAuthenticated', 'true');
      renderWithRouter(<AppWithNavigation />, { initialPath: '/anything' });
    });
    expect(await screen.findByText(/Mock MainApp/i)).toBeInTheDocument();
  });
});
