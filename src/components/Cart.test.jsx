import {
  cleanup, render, screen,
} from '@testing-library/react';

import Cart from './Cart';

describe('Cart', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders screen', async () => {
    render(
      <Cart />,
    );

    screen.getByText('장바구니');
    screen.getByText('주문 금액');
    screen.getByText('총 주문 금액');
    screen.getByText('선택 상품 금액');
  });
});
