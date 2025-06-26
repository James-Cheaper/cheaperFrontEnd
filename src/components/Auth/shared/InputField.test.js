import { render, screen } from '@testing-library/react';
import InputField from './InputField';
import { Mail } from 'lucide-react';

test('renders input with placeholder and label', () => {
  render(
    <InputField
      id="test-email"
      name="email"
      type="email"
      icon={Mail}
      value=""
      onChange={() => {}}
      error=""
      placeholder="Email Address"
    />
  );

  expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
});