import {
  cleanup, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import CartStore from '../stores/CartStore';

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

  context('when there is an item', () => {
    it('renders screen', async () => {
      renderCart();

      // todo 장바구니 상품 추가  필요

      const cartStore = new CartStore();
      cartStore.fetchCart();

      cartStore.addItem({
        productId: 1, productName: '가디건', optionId: 1, quantity: 1,
      });

      await waitFor(() => {
        screen.getByText('장바구니');
        screen.getByText('주문 금액');
        screen.getByText('총 주문 금액');
        screen.getByText('선택 상품 금액');
        screen.getByText('가디건');
      });
    });
  });

  it('delete Item', () => {
    renderCart();

    // cartStore.addItem({
    //   productId: 1, productName: '가디건', optionId: 1, quantity: 1,
    // });

    // todo 장바구니 상품 추가 필요
  });

  describe('order', () => {
    context('when there are selected itmes', () => {
      it('"선택된 상품이 없습니다" 메세지 확인', () => {
        renderCart();

        fireEvent.click(screen.getByText('주문하기'));

        screen.getByText('선택된 상품이 없습니다');
      });
    });
  });
});
