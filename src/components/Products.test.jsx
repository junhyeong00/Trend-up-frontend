import { render, screen, waitFor } from '@testing-library/react';
import ProductsStore, { productsStore } from '../stores/ProductsStore';

import Products from './Products';

// const fetchProducts = jest.fn();

// jest.mock('../hooks/useProductsStore', () => () => ({
//   fetchProducts,
// }));

describe('Products', () => {
  it('1페이지 상품 목록 확인 - 8개(총 9개)', async () => {
    render(
      <Products />,
    );

    productsStore.fetchProducts(1);

    await waitFor(() => {
      screen.getByText('상품 1');
      screen.getByText('상품 8');
    });
  });

  it('2페이지 상품 목록 확인 - 1개(총 9개)', async () => {
    render(
      <Products />,
    );

    productsStore.fetchProducts(2);

    await waitFor(() => {
      screen.getByText('상품 9');
    });
  });
});
