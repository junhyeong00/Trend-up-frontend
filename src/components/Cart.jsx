/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import useCartStore from '../hooks/useCartStore';
import useOrderFormStore from '../hooks/useOrderFormStore';

import Error from './ui/Error';

import PrimaryButton from './ui/PrimaryButton';

import CartItems from './CartItems';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';

import defaultTheme from '../styles/DefaultTheme';

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 1em;
  min-width: 1000px;
`;

const Title = styled.h2`
  margin-bottom: 1em;
`;

const Form = styled.form`
  margin-bottom: 1em;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin-bottom: 1em;
  }

  > div:last-child {
    display: flex;
    justify-content: center;
  }

  button {
    padding-inline: 6em;
  }
`;

const Command = styled.div`
  margin-top: 2em;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    width: 15%;
    margin-bottom: 1.4em;
  }
  a {
    font-size: .8em;
    text-decoration: underline;
    color: ${defaultTheme.colors.fifth};
    :hover {
      color: ${defaultTheme.colors.fifth};
    }
  }
`;

export default function Cart({ navigate }) {
  const cartStore = useCartStore();
  const orderFormStore = useOrderFormStore();

  const [errorMessage, setErrorMessage] = useState('');

  const { items } = cartStore.cart;

  const handleClickPurchase = () => {
    orderFormStore.initialize();

    const orderProducts = items.filter((i) => i.selected);
    if (!orderProducts.length) {
      setErrorMessage('선택된 상품이 없습니다');
      return;
    }

    navigate(
      '/order',
      { state: orderProducts },
    );
  };

  return (
    <Container>
      <Title>장바구니</Title>
      {items.length
        ? (
          <>
            <CartItems />
            <Form>
              <CartSummary />
              <div>
                <PrimaryButton
                  type="button"
                  onClick={handleClickPurchase}
                >
                  주문하기
                </PrimaryButton>
              </div>
              <Error>{errorMessage || null}</Error>
            </Form>
          </>
        )
        : (
          <>
            <EmptyCart />
            <Command>
              <Link to="/products">계속 쇼핑하기</Link>
            </Command>
          </>
        )}
    </Container>
  );
}
