import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import numberFormat from '../utils/NumberFormat';

import PageNumbers from './PageNumbers';

import useProductsStore from '../hooks/useProductsStore';

export default function Products() {
  const navigate = useNavigate();
  const productsStore = useProductsStore();

  const { products, totalPageCount } = productsStore;

  const { currentPage } = productsStore;

  useEffect(() => {
    productsStore.fetchProducts(currentPage);
  }, []);

  const handlePageClick = (page) => {
    productsStore.changePage(page);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button
              type="button"
              onClick={() => handleProductClick(product.id)}
            >
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
