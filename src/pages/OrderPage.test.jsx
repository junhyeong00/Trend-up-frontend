import { render } from '@testing-library/react';

import OrderPage from './OrderPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
  useLocation: () => ({
    state: {
      orderProducts: { name: '가디건' },
    },
  }),
}));

describe('OrderPage', () => {
  it('render screen', () => {
    render(<OrderPage />);
  });
});
