import {
  cleanup, render,
} from '@testing-library/react';
import { productsStore } from '../stores/ProductsStore';
import ProductsPage from './ProductsPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
}));

describe('ProductsPage', () => {
  afterEach(() => {
    cleanup();
  });

  it('render screen', async () => {
    render(<ProductsPage />);
    productsStore.fetchProducts(1);
  });
});
