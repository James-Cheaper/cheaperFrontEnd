import { render, screen, fireEvent } from '@testing-library/react';
import CookieBanner from './CookieBanner';

describe('CookieBanner', () => {
  const mockAccept = jest.fn();
  const mockDecline = jest.fn();
  const mockDismiss = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders cookie banner and buttons when shown', () => {
    render(
      <CookieBanner
        show={true}
        onAccept={mockAccept}
        onDecline={mockDecline}
        onDismiss={mockDismiss}
      />
    );

    // ✅ Check the cookie message
    expect(
      screen.getByText(/We use cookies to improve your experience/i)
    ).toBeInTheDocument();

    // ✅ Check buttons
    expect(screen.getByRole('button', { name: /Accept/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Decline/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument();
  });

  test('clicking Accept calls onAccept', () => {
    render(
      <CookieBanner
        show={true}
        onAccept={mockAccept}
        onDecline={mockDecline}
        onDismiss={mockDismiss}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Accept/i }));
    expect(mockAccept).toHaveBeenCalled();
  });

  test('clicking Decline calls onDecline', () => {
    render(
      <CookieBanner
        show={true}
        onAccept={mockAccept}
        onDecline={mockDecline}
        onDismiss={mockDismiss}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Decline/i }));
    expect(mockDecline).toHaveBeenCalled();
  });

  test('clicking Close calls onDismiss', () => {
    render(
      <CookieBanner
        show={true}
        onAccept={mockAccept}
        onDecline={mockDecline}
        onDismiss={mockDismiss}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
    expect(mockDismiss).toHaveBeenCalled();
  });
});
