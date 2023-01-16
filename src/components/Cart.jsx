/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

import useCartStore from '../hooks/useCartStore';
import useOrderFormStore from '../hooks/useOrderFormStore';

import numberFormat from '../utils/NumberFormat';
import Error from './ui/Error';

import PrimaryButton from './ui/PrimaryButton';

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 1em;
`;

const Title = styled.h2`
  margin-bottom: 1em;
`;

const Table = styled.table`
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid black;
  border-radius: 4px;
  width: 100%;
`;

const Tr = styled.tr`
  display: grid;
  grid-template-columns: .5fr 3fr 1fr 1fr 1fr .6fr;
  gap: 3em;
  width: 100%;

  label {
    display: none;
  }
`;

const Item = styled.tr`
  display: grid;
  grid-template-columns: .5fr 3fr 1fr 1fr 1fr .5fr;
  gap: 3em;
  margin-top: 1.4em;

  td {
    display: flex;
  }
`;

const Form = styled.form`
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid black;
  border-radius: 4px;

  div {
    margin-bottom: 1em;
  }
`;

const CountForm = styled.dd`
  border: 1px solid #D9D9D9;
  border-radius: 5px;
  padding: .4em;
  button {
    border: none;
    background: none;
    font-weight: bold;
  }
  span {
    padding-inline: .4em;
  }
`;

const Image = styled.img`
  background: center url(${(props) => props.url}) no-repeat;
  background-size: contain;
  width: 8em;
  height: 8em;
`;

export default function Cart({ navigate }) {
  const [, setCart] = useLocalStorage('cart', '{"items":[]}');
  const cartStore = useCartStore();
  const orderFormStore = useOrderFormStore();

  const [errorMessage, setErrorMessage] = useState('');

  // const { items } = JSON.parse(cart);

  const { items } = cartStore.cart;

  const totalPrice = items.filter((i) => i.selected)
    .reduce((total, item) => {
      const price = (item.price + item.optionPrice) * item.quantity;
      return total + price;
    }, 0);

  const deliveryFee = totalPrice >= 50000 ? 0 : 3000;

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
      <div>
        <button
          type="button"
          onClick={() => {
            cartStore.deleteSelectedItem();
            setCart(JSON.stringify(cartStore.cart));
          }}
        >
          ❌ 선택 삭제
        </button>
      </div>
      <Table>
        <thead>
          <Tr>
            <input
              id="selectall"
              type="checkbox"
              name="product"
              onChange={() => {
                cartStore.toggleAllItemSelected();
                setCart(JSON.stringify(cartStore.cart));
              }}
              checked={cartStore.isAllSelected()}
            />
            <label htmlFor="selectall">전체 선택</label>
            <th>상품 정보</th>
            <th>옵션</th>
            <th>수량</th>
            <th>금액</th>
          </Tr>
        </thead>
        <tbody>
          {items.length ? (
            <>
              {items.map((item) => (
                <Item key={item.id}>
                  <input
                    type="checkbox"
                    name="product"
                    checked={item.selected}
                    onChange={() => {
                      cartStore.toggleSelected({ id: item.id });
                      setCart(JSON.stringify(cartStore.cart));
                    }}
                  />
                  <td>
                    <a href={`products/${item.productId}`}>
                      <Image src={item.image} alt={item.name} />
                    </a>
                    <p>{item.name}</p>
                  </td>
                  <td>
                    {item.optionName}
                  </td>
                  <td>
                    <CountForm>
                      <button
                        type="button"
                        onClick={() => cartStore.decreaseQuantity({ id: item.id })}
                        disabled={item.quantity < 2}
                      >
                        ➖
                      </button>
                      <span>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => cartStore.increaseQuantity({ id: item.id })}
                      >
                        ➕
                      </button>
                    </CountForm>
                  </td>
                  <td>
                    {numberFormat((item.price + item.optionPrice) * item.quantity)}
                    원
                  </td>
                  <button
                    type="button"
                    onClick={() => {
                      cartStore.deleteItem({ id: item.id });
                      setCart(JSON.stringify(cartStore.cart));
                    }}
                  >
                    ❌
                  </button>
                </Item>
              ))}
            </>
          ) : (
            <p>장바구니가 비어있습니다</p>
          )}
        </tbody>
      </Table>
      <Form>
        <div>
          <h3>총 주문 금액</h3>
          <dl>
            <dt>선택 상품 금액</dt>
            <dd>
              {numberFormat(totalPrice)}
              원
            </dd>
            <dt>배송비</dt>
            <dd>
              {numberFormat(deliveryFee)}
              원
            </dd>
            <dt>주문 금액</dt>
            <dd>
              {numberFormat(totalPrice + deliveryFee)}
              원
            </dd>
          </dl>
        </div>
        <PrimaryButton
          type="button"
          onClick={handleClickPurchase}
        >
          주문하기
        </PrimaryButton>
        <Error>{errorMessage || null}</Error>
      </Form>
    </Container>
  );
}
