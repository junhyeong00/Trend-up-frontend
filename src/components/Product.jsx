import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';

import StarRatings from 'react-star-ratings';
import useCartStore from '../hooks/useCartStore';
import useProductStore from '../hooks/useProductStore';
import useOrderFormStore from '../hooks/useOrderFormStore';

import numberFormat from '../utils/NumberFormat';
import optionPriceFormat from '../utils/OptionPriceFormat';

import Modal from './Modal';

import Error from './ui/Error';
import PrimaryButton from './ui/PrimaryButton';
import useReviewsStore from '../hooks/useReviewsStore';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1em auto;
`;

const ProductImage = styled.img`
  width: 32em;
  height: 25em;
  object-fit: cover;
`;

const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 32em;
  margin-bottom: 4em;
`;

const Name = styled.p`
  font-size: 1.5em;
`;

const Price = styled.span`
  font-size: 1.8em;
  font-weight: bold;
  padding-block: 1em;
  border-bottom: 1px solid #D9D9D9;
`;

const Detail = styled.dl`
  div {
    display: flex;
    padding-block: 1.3em;
  }

  dt {
    width: 20%;
    
  }

  dd {
    color: #666666;
  }

  select {
    width: 100%;
    border-color: #CCCCCC;
    padding: .5em;
  }

  div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const TotalPrice = styled.span`
  margin-block: 1.2em .2em;
  text-align: end;
  font-size: 1em;

  span {
    font-size: 1.8em;
    font-weight: bold;
  }
`;

const CountForm = styled.dd`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 27%;
  height: 2.5em;
  border: 1px solid #D9D9D9;
  border-radius: 5px;
  padding: .4em;
  text-align: center;
  align-items: center;

  button {
    border: none;
    background: none;
    font-weight: bold;
  }

  span {
    padding-inline: .4em;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0,0,0,.5);
  z-index: 999;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1em;
  justify-content: space-around;

  button {
    width: 48%;
  }
`;

const CartButton = styled.button`
  margin-top: 1em;
  padding: 1.2em 3em;
  border: 1px solid #CCCCCC;
  background: none;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export default function Product({ navigate, productId }) {
  const [accessToken] = useLocalStorage('accessToken', '');
  const [, setCart] = useLocalStorage('cart', '{"items":[]}');

  const [modalOpen, setModalOpen] = useState(false);

  const productStore = useProductStore();
  const cartStore = useCartStore();
  const orderFormStore = useOrderFormStore();
  const reviewsStore = useReviewsStore();

  const { totalRating } = reviewsStore;

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
    image: product.image,
  }];

  const handleClickPurchase = () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

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
    if (!accessToken) {
      navigate('/login');
      return;
    }

    if (selectedOptionId === 'none' || !selectedOptionId) {
      productStore.notChoiceOption();
      return;
    }

    cartStore.addItem({
      productId: product.id,
      name: product.name,
      optionId: selectedOptionId,
      optionName: selectedOptionName,
      price: product.price,
      optionPrice: selectedOptionPrice,
      quantity: selectedCount,
      image: product.image,
    });

    setCart(JSON.stringify(cartStore.cart));
    setModalOpen(true);
  };

  const handleClickStay = () => {
    setModalOpen(false);
  };

  const handleClickMove = () => {
    setModalOpen(false);
    navigate('/cart');
  };

  return (
    <Container>
      <ProductImage src={product.image} alt="product" />
      <ProductDescription>
        <Title>
          <Name>{product.name}</Name>
          <StarRatings
            rating={totalRating}
            starRatedColor="#ffc501"
            starEmptyColor="#ffe899"
            starDimension="1.15em"
            starSpacing="2px"
          />
        </Title>
        <Price>
          {numberFormat(product.price)}
          원
        </Price>
        <Detail>
          <div>
            <select
              id="options"
              onChange={handleChangeOption}
            >
              <option
                value="none"
              >
                {' '}
                옵션 선택(필수)
                {' '}
              </option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                  {' '}
                  {optionPriceFormat(option.optionPrice)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <CountForm>
              <button
                type="button"
                onClick={() => productStore.decreaseCount()}
                disabled={selectedCount < 2}
              >
                ➖
              </button>
              <span>
                {selectedCount}
              </span>
              <button
                type="button"
                onClick={() => productStore.increaseCount()}
              >
                ➕
              </button>
            </CountForm>
            <TotalPrice>
              총 상품 금액:
              {' '}
              <span>
                {numberFormat(totalPrice)}
                원
              </span>
            </TotalPrice>
          </div>
        </Detail>
        <Buttons>
          <PrimaryButton
            type="button"
            onClick={handleClickPurchase}
          >
            구매하기
          </PrimaryButton>
          <CartButton
            type="button"
            onClick={handleClickCart}
          >
            장바구니
          </CartButton>
        </Buttons>
        <Error>{errorMessage}</Error>
      </ProductDescription>
      {modalOpen ? (
        <ModalBackground>
          <Modal
            titleMessage="장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?"
            firstButtonName="계속 쇼핑하기"
            firstHandleClick={handleClickStay}
            secondButtonName="장바구니로 이동"
            secondHandleClick={handleClickMove}
          />
        </ModalBackground>
      ) : null}
    </Container>
  );
}
