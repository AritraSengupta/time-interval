import { render, screen } from '@testing-library/react';
import App from './App';
import { Router } from 'react-router-dom';

jest.mock('./custom-hooks', () => ({
  useLocationUpdater: jest.fn(),
}));

const historyMock = {
  listen: jest.fn(),
  location: { pathname: 123 },
  createHref: jest.fn().mockImplementation(() => '123')
};
it('renders screen A', () => {
  render(<Router history={historyMock}><App /></Router>);
  const linkElement = screen.getByText(/Screen A/i);
  expect(linkElement).toBeInTheDocument();
});
