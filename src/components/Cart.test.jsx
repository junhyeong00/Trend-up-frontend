import {
  cleanup, render, screen,
} from '@testing-library/react';

import Cart from './Cart';

const context = describe;

describe('Cart', () => {
  afterEach(() => {
    cleanup();
  });

  function renderCart() {
    render(<Cart />);
  }

  context('when there is no item', () => {
    it('renders screen', async () => {
      renderCart();

      screen.getByText('장바구니');
      screen.getByText('주문 금액');
      screen.getByText('총 주문 금액');
      screen.getByText('선택 상품 금액');
      screen.getByText('장바구니가 비어있습니다');
    });
  });

  // context('when there is an item', () => {
  //   it('renders screen', async () => {
  //     renderCart();

  //     // todo 장바구니 상품 추가  필요

  //     cartStore.addItem({
  //       productId: 1, productName: '가디건', optionId: 1, quantity: 1,
  //     });

  //     screen.getByText('장바구니');
  //     screen.getByText('주문 금액');
  //     screen.getByText('총 주문 금액');
  //     screen.getByText('선택 상품 금액');
  //     screen.getByText('가디건');
  //   });
  // });

  it('delete Item', () => {
    renderCart();

    // cartStore.addItem({
    //   productId: 1, productName: '가디건', optionId: 1, quantity: 1,
    // });

    // todo 장바구니 상품 추가 필요
  });
});
