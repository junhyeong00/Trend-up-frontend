import { render } from '@testing-library/react';
import { productsStore } from '../stores/ProductsStore';
import ProductsPage from './ProductsPage';

// const fetchProducts = jest.fn();

// jest.mock('../hooks/useProductsStore', () => () => ({
//   fetchProducts,
// }));

describe('ProductsPage', () => {
  it('render screen', () => {
    render(<ProductsPage />);
    productsStore.fetchProducts(1);

    // expect(fetchProducts).toBeCalled();
  });
});
