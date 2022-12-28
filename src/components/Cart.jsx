/* eslint-disable react/jsx-props-no-spreading */

import styled from 'styled-components';

import useCartStore from '../hooks/useCartStore';

import numberFormat from '../utils/NumberFormat';

import PrimaryButton from './ui/PrimaryButton';

const Container = styled.div`
  width: 100%;
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

  tr {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr .6fr;
    gap: 3em;
    width: 100%;
  }

  li {
    display: grid;
    grid-template-columns: .5fr 3fr 1fr 1fr 1fr .5fr;
    gap: 3em;
    margin-top: 1.4em;
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

export default function Cart() {
  const cartStore = useCartStore();
  const { cart } = cartStore;

  const onSubmit = async () => {

  };

  return (
    <Container>
      <Title>장바구니</Title>
      <div>
        <input type="checkbox" />
        <label>전체 선택</label>
        <button type="button">❌ 선택 삭제</button>
      </div>
      <Table>
        <div>
          <thead>
            <tr>
              <th>상품 정보</th>
              <th>옵션</th>
              <th>수량</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.length ? (
              <ul>
                {cart.items.map((item) => (
                  <li key={item.id}>
                    <input type="checkbox" />
                    <td>
                      {item.name}
                    </td>
                    <td>
                      {item.optionName}
                    </td>
                    <td>
                      {item.quantity}
                      개
                    </td>
                    <td>
                      {numberFormat((item.price + item.optionPrice) * item.quantity)}
                      원
                    </td>
                    <button type="button">❌</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>장바구니가 비어있습니다</p>
            )}
          </tbody>
        </div>
      </Table>
      <Form>
        <div>
          <h3>총 주문 금액</h3>
          <dl>
            <dt>선택 상품 금액</dt>
            <dd>
              {/* {numberFormat(payment)} */}
              원
            </dd>
            <dt>배송비</dt>
            <dd>
              {numberFormat(3000)}
              원
            </dd>
            <dt>주문 금액</dt>
            <dd>
              {/* {numberFormat(deliveryFee)} */}
              원
            </dd>
          </dl>
        </div>
        <PrimaryButton type="submit">
          주문하기
        </PrimaryButton>
      </Form>
    </Container>
  );
}
