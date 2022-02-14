import { render, screen } from '@testing-library/react';
import Tasker from './Tasker';

test('renders learn react link', () => {
  render(<Tasker />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
