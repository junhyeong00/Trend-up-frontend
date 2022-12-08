import { useEffect } from 'react';

import numberFormat from '../utils/NumberFormat';

import PageNumbers from './PageNumbers';

import useProductsStore from '../hooks/useProductsStore';

export default function Products() {
  const productsStore = useProductsStore();

  const { products, totalPageCount } = productsStore;

  const { currentPage } = productsStore;

  useEffect(() => {
    productsStore.fetchProducts(currentPage);
  }, []);

  const handlePageClick = (page) => {
    productsStore.changePage(page);
  };

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button type="button">
              <p>{product.name}</p>
              <p>
                {numberFormat(product.price)}
                원
              </p>
            </button>
          </li>
        ))}
      </ul>
      <PageNumbers
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}
