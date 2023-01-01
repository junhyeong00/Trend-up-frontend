import { render } from '@testing-library/react';

import CartPage from './CartPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('CartPage', () => {
  it('renders screen', () => {
    render(
      <CartPage />,
    );
  });
});
