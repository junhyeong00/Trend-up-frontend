import { render } from '@testing-library/react';

import CartPage from './CartPage';

describe('CartPage', () => {
  it('renders screen', () => {
    render(
      <CartPage />,
    );
  });
});
