import { render } from '@testing-library/react';

import OrderPage from './OrderPage';

const navigate = jest.fn();

jest.mock('nanoid', () => ({ nanoid: () => '1234' }));

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
  useLocation: () => ({
    state: {
      orderProducts: [{
        name: '가디건', price: 1000, optionName: '기본', optionPrice: 0, quantity: 1,
      }],
    },
  }),
}));

describe('OrderPage', () => {
  it('render screen', () => {
    render(<OrderPage />);
  });
});
