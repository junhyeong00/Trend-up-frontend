import { render, screen, waitFor } from '@testing-library/react';
import { productStore } from '../stores/ProductStore';
import ProductPage from './ProductPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/products/1',
  }),
  useNavigate: () => navigate,
}));

describe('ProductPage', () => {
  it('render screen', async () => {
    render(<ProductPage />);
    productStore.fetchProduct(1);

    await waitFor(() => {
      screen.getByText(/구매하기/);
    });
  });
});
