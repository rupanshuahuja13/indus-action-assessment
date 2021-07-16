import { render, screen } from '@testing-library/react';
import App from './App';
import SubmitButton from './components/SubmitButton';

test('renders learn react link', () => {
  render(<SubmitButton />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
