import { cleanup, render } from '@testing-library/react';

import OrderDetailPage from './OrderDetailPage';

const navigate = jest.fn();

jest.mock('nanoid', () => ({ nanoid: () => '1234' }));

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
  useLocation: () => ({
    pathname: '/orders/1',
  }),
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

describe('OrderDetailPage', () => {
  it('render screen', () => {
    render(<OrderDetailPage />);

    cleanup();
  });
});
