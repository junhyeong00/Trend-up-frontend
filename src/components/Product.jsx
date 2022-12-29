import { useEffect } from 'react';
import styled from 'styled-components';
import useCartStore from '../hooks/useCartStore';
import useProductStore from '../hooks/useProductStore';
import { orderFormStore } from '../stores/OrderFormStore';
import numberFormat from '../utils/NumberFormat';
import Error from './ui/Error';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
`;

export default function Product({ navigate, productId }) {
  const productStore = useProductStore();
  const cartStore = useCartStore();

  useEffect(() => {
    productStore.fetchProduct(productId);
    productStore.fetchOptions(productId);
  }, []);

  const {
    product, totalPrice, selectedCount, options,
    selectedOptionId, selectedOptionName, selectedOptionPrice,
    errorMessage,
  } = productStore;

  const orderProducts = [{
    productId: product.id,
    name: product.name,
    optionId: selectedOptionId,
    optionName: selectedOptionName,
    optionPrice: selectedOptionPrice,
    price: product.price,
    quantity: selectedCount,
  }];

  const handleClickPurchase = () => {
    if (selectedOptionId === 'none' || !selectedOptionId) {
      productStore.notChoiceOption();
      return;
    }

    orderFormStore.initialize();
    navigate(
      '/order',
      { state: orderProducts },
    );
  };

  const handleChangeOption = (e) => {
    productStore.changeOption(e.target.value);
  };

  const handleClickCart = () => {
    cartStore.addItem({
      productId: product.id,
      name: product.name,
      optionId: selectedOptionId,
      optionName: selectedOptionName,
      price: product.price,
      optionPrice: selectedOptionPrice,
      quantity: selectedCount,
    });

    navigate('/cart');
  };

  return (
    <Container>
      <img src={product.image} alt="product" />
      <div>
        <p>{product.name}</p>
        <p>
          {numberFormat(product.price)}
          원
        </p>
        <div>
          <div>
            <p>옵션</p>
            <select
              id="options"
              onChange={handleChangeOption}
            >
              <option
                value="none"
              >
                {' '}
                선택
                {' '}
              </option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                  {' '}
                  ( +
                  {option.optionPrice}
                  원
                  )
                </option>
              ))}
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
          onClick={handleClickPurchase}
        >
          구매하기
        </button>
        <div>
          <button type="button">찜</button>
          <button
            type="button"
            onClick={handleClickCart}
          >
            장바구니

          </button>
        </div>
        <Error>{errorMessage}</Error>
      </div>
    </Container>
  );
}
