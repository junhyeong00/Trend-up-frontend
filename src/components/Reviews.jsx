import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

import PageNumbers from './PageNumbers';

import useProductsStore from '../hooks/useProductsStore';

const Container = styled.div`
  padding: 1em;
`;

const List = styled.ul`
  li {
    padding-block: 1em;
  }

  button {
    padding: 1em;
  }
`;

export default function Reviews() {
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
    <Container>
      <List>
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
      </List>
      <PageNumbers
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
    </Container>
  );
}
