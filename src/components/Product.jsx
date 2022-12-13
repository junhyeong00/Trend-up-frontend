import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
`;

export default function Product({ navigate }) {
  const location = useLocation();

  const productId = location.pathname.split('/')[2];

  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProduct(productId);
  }, []);

  const { product, totalPrice, selectedCount } = productStore;

  const handlePurchaseClick = () => {
    navigate('/order');
  };

  return (
    <Container>
      <img src="" alt="product" />
      <div>
        <p>{product.name}</p>
        <p>
          {numberFormat(product.price)}
          원
        </p>
        <div>
          <div>
            <p>옵션</p>
            <select>
              <option value="none"> 선택 </option>
            </select>
          </div>
          <div>
            <dt>구매수량</dt>
            <dd>
              <button
                type="button"
                onClick={() => productStore.decreaseCount()}
                disabled={selectedCount < 2}
              >
                -
              </button>
              <span>
                {selectedCount}
              </span>
              <button
                type="button"
                onClick={() => productStore.increaseCount()}
              >
                +
              </button>
            </dd>
          </div>
          <p>
            총 상품 금액:
            {' '}
            <span>
              {numberFormat(totalPrice)}
              원
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={handlePurchaseClick}
        >
          구매하기
        </button>
        <div>
          <button type="button">찜</button>
          <button type="button">장바구니</button>
        </div>
      </div>
    </Container>
  );
}
