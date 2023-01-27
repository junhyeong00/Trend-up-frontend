import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

import useProductsStore from '../hooks/useProductsStore';

const Container = styled.div`
  margin-top: 1em;
  padding: 1em;
`;

const Overview = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: .6em;
    row-gap: 1.5em;
    margin-top: 1em;
    margin-inline: auto;

    li {
      height: 20em;
      width: 100%;
    }

    button {
        height: 90%;
        width: 100%;
        background: none;
        border: none;
        text-align: left;
    }

    p {
        margin-block: .5em .4em;
        color: #444444;
    }

    img {
        width: 90%;
        height: 14em;
        object-fit: cover;
        border-radius: 8px;
    }
`;

export default function Recommend() {
  const navigate = useNavigate();
  const productsStore = useProductsStore();

  const { products } = productsStore;

  const { currentPage } = productsStore;

  useEffect(() => {
    productsStore.fetchProducts(currentPage);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Container>
      <h3>추천 상품</h3>
      {products.length ? (
        <Overview>
          {products.slice(0, 4).map((product) => (
            <li key={product.id}>
              <button
                type="button"
                onClick={() => handleProductClick(product.id)}
              >
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <p>
                  <strong>{numberFormat(product.price)}</strong>
                  원
                </p>
              </button>
            </li>
          ))}
        </Overview>
      ) : null}
    </Container>
  );
}
