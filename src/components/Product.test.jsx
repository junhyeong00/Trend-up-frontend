import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { productStore } from '../stores/ProductStore';

import Product from './Product';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/products/1',
  }),
  useNavigate: () => navigate,
}));

describe('Product', () => {
  it('renders product information', async () => {
    render(
      <Product />,
    );

    productStore.fetchProduct(1);

    await waitFor(() => {
      screen.getByText('상품 1');
      screen.getByText('구매하기');
      screen.getByText('총 상품 금액:');
      screen.getAllByText('500원');
      screen.getByText('1');
    });
  });

  it('listens for increase count button click event', async () => {
    render(
      <Product />,
    );

    productStore.fetchProduct(1);

    fireEvent.click(screen.getByText('+'));

    await waitFor(() => {
      screen.getByText('2');
      screen.getByText('1,000원');
    });
  });

  it('listens for decrease count button click event', async () => {
    render(
      <Product />,
    );

    productStore.fetchProduct(1);

    fireEvent.click(screen.getByText('-'));

    await waitFor(() => {
      screen.getByText('1');
      screen.getAllByText('500원');
    });
  });
});
