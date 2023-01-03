import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

import PageNumbers from './PageNumbers';

import useProductsStore from '../hooks/useProductsStore';
import Overview from './ui/Overview';

const Container = styled.div`
  padding: 1em;
`;

export default function Products() {
  const navigate = useNavigate();
  const productsStore = useProductsStore();

  const { products, totalPageCount, keyword } = productsStore;

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

  if (!products.length) {
    return (<p>상품이 존재하지 않습니다</p>);
  }

  return (
    <Container>
      {keyword}
      <Overview>
        {products.map((product) => (
          <li key={product.id}>
            <button
              type="button"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>
                {numberFormat(product.price)}
                원
              </p>
            </button>
          </li>
        ))}
      </Overview>
      <PageNumbers
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
    </Container>
  );
}
