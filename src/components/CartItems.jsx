/* eslint-disable react/jsx-props-no-spreading */

import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';

import { Link } from 'react-router-dom';
import useCartStore from '../hooks/useCartStore';

import numberFormat from '../utils/NumberFormat';
import optionPriceFormat from '../utils/OptionPriceFormat';

import defaultTheme from '../styles/DefaultTheme';

const Container = styled.div`
  margin-bottom: 1em;
`;

const Table = styled.table`
  border-top: 1px solid ${defaultTheme.colors.fourth};
  border-bottom: 1px solid ${defaultTheme.colors.fourth} ;
  width: 100%;
  border-collapse: collapse;
  thead {
    font-size: .9em;
    border-bottom: 1px solid ${defaultTheme.colors.fourth};
    height: 2.5em;
  }
  th, td {
    vertical-align: middle;
    text-align: center;
    font-size: .8em;
    color: ${defaultTheme.colors.sixth};
  }
  tr {
    border-bottom: 1px solid ${defaultTheme.colors.fourth};
  }
  th:nth-child(1) {
    width: 5%;
  }
  th:nth-child(2) {
    width: 50%;
  }
  td:nth-child(2) {
    text-align: left;
    position: relative;
  }
  th:nth-child(4) {
    width: 10%;
  }
  td:nth-child(4) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  th:nth-child(5) {
    width: 15%;
  }
  td {
    border-right: 1px solid ${defaultTheme.colors.fourth};
    height: 8em;
    div {
      display: flex;
    }
  }
  td:first-child {
    border: none;
  }
  td:last-child {
    border: none;
  }
  strong {
    font-size: 1.3em;
    font-weight: 700;
    margin-bottom: .5em;
    color: ${defaultTheme.colors.primary};
  }
  label {
    display: none;
  }
`;

const CountForm = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  border: 1px solid #D9D9D9;
  border-radius: 5px;
  padding: .4em;
  button {
    border: none;
    background: none;
    font-weight: bold;
  }
  span {
    margin: auto;
  }
`;

const DeleteButton = styled.button`
  font-size: 0.7em;
  height: 2.5em;
  border: 1px solid ${defaultTheme.colors.fourth};
  margin-top: 1em;
  padding: .2em .6em;
  display: block;
  color: ${defaultTheme.colors.fifth};
  background-color: white;
  cursor: pointer;
  :hover {
    border: 1px solid ${defaultTheme.colors.fifth}
  }
`;

const Item = styled(Link)`
  width: 18%;
  display: flex;
  align-items: center;
  color: ${defaultTheme.colors.primary};
`;

const ImageContainer = styled.div`
  width: 6em;
  height: 6em;
  padding: .5em;
  margin-right: 1em;
  display: flex;
  align-items: center;
  border: 1px solid ${defaultTheme.colors.fourth};
`;

const CancelButtonContainer = styled.div`
  position: absolute;
  top: 10;
  right: 0;
  width: 8%;
  height: 1em;
`;

const CancelButton = styled.button`
  font-weight: 100;
  border: none;
  flex-direction: column;
  background: white;
  color: ${defaultTheme.colors.fourthText};
  cursor: pointer;
  :hover {
    background-color: ${defaultTheme.colors.secondary};
    color: white;
  }
  :active {
    background-color: ${defaultTheme.colors.primary};
    color: white;
  }
`;

const ProductInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .3em;
`;

export default function CartItems() {
  const [, setCart] = useLocalStorage('cart', '{"items":[]}');
  const cartStore = useCartStore();

  const { items } = cartStore.cart;

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>
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
            </th>
            <th>상품 정보</th>
            <th>옵션</th>
            <th>수량</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {items.length ? (
            <>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      name="product"
                      checked={item.selected}
                      onChange={() => {
                        cartStore.toggleSelected({ id: item.id });
                        setCart(JSON.stringify(cartStore.cart));
                      }}
                    />
                  </td>
                  <td>
                    <div>
                      <Item to={`/products/${item.productId}`}>
                        <ImageContainer>
                          <img
                            src={item.image}
                            alt={item.name}
                            height={60}
                            width={60}
                          />
                        </ImageContainer>
                      </Item>
                      <ProductInformation>
                        <p>{item.name}</p>
                        <p>
                          {numberFormat(item.price)}
                          원
                        </p>
                      </ProductInformation>
                      <CancelButtonContainer>
                        <CancelButton
                          type="button"
                          onClick={() => {
                            cartStore.deleteItem({ id: item.id });
                            setCart(JSON.stringify(cartStore.cart));
                          }}
                        >
                          X
                        </CancelButton>
                      </CancelButtonContainer>
                    </div>
                  </td>
                  <td>
                    {item.optionName}
                    {' '}
                    {optionPriceFormat(item.optionPrice)}
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
                </tr>
              ))}
            </>
          ) : (
            <p>장바구니가 비어있습니다</p>
          )}
        </tbody>
      </Table>
      <DeleteButton
        type="button"
        onClick={() => {
          cartStore.deleteSelectedItem();
          setCart(JSON.stringify(cartStore.cart));
        }}
      >
        선택 상품 삭제
      </DeleteButton>
    </Container>
  );
}
