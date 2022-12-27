import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';

import styled from 'styled-components';

import useOrderStore from '../hooks/useOrderStore';

import numberFormat from '../utils/NumberFormat';
import useReviewFormStore from '../hooks/useReviewFormStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
`;

const List = styled.ul`
  li {
    width: 60%;
    margin-top: .3em;
    padding: .5em;
    border: 1px solid black;
  }
`;

const ReceiverInformation = styled.dl`
    display: grid;
    grid-template-columns: 1fr 5fr;
    row-gap: .5em;
`;

const PaymentInformation = styled.dl`
    display: grid;
    grid-template-columns: 1fr 5fr;
    row-gap: .5em;
`;

export default function OrderDetail({ navigate }) {
  const location = useLocation();

  const orderId = location.pathname.split('/')[2];

  const reviewFormStore = useReviewFormStore();

  const orderStore = useOrderStore();

  useEffect(() => {
    orderStore.fetchOrder(orderId);
  }, []);

  const { order } = orderStore;

  const products = order.orderProducts;

  const handleReviewWriteClick = (product) => {
    navigate('/my/review/write', {
      state: { product, orderId: order.id },
    });
    reviewFormStore.initialize();
  };

  if (!Object.keys(order).length) {
    return (
      <p>Now loading</p>
    );
  }

  return (
    <Container>
      <h3>주문 상세정보</h3>
      <div>
        <h4>주문 상품</h4>
        <List>
          {products.map((product) => (
            <li key={nanoid()}>
              <p>{product.productName}</p>
              <p>{product.productOption}</p>
              <p>
                {product.productQuantity}
                개
              </p>
              <p>{product.productPrice}</p>
              {product.writable
                ? (
                  <button
                    type="button"
                    onClick={() => handleReviewWriteClick(product)}
                  >
                    리뷰 작성
                  </button>
                ) : null}
            </li>
          ))}
        </List>
      </div>
      <div>
        <h4>받는 사람 정보</h4>
        <ReceiverInformation>
          <dt>받는 사람</dt>
          <dd>{order.receiver}</dd>
          <dt>연락처</dt>
          <dd>{order.phoneNumber}</dd>
          <dt>받는 주소</dt>
          <dd>
            (
            {order.zipCode}
            )
            {' '}
            {order.roadAddress}
            {' '}
            {order.detailAddress}
          </dd>
          <dt>배송 요청 사항</dt>
          <dd>{order.deliveryRequest}</dd>
        </ReceiverInformation>
      </div>
      <div>
        <h4>결제 정보</h4>
        <PaymentInformation>
          <dt>결제금액</dt>
          <dd>
            {numberFormat(order.payment)}
            원
          </dd>
          <dt>상품금액</dt>
          <dd>
            {numberFormat(order.totalPrice)}
            원
          </dd>
          <dt>배송비</dt>
          <dd>
            {numberFormat(order.deliveryFee)}
            원
          </dd>
        </PaymentInformation>
      </div>
    </Container>
  );
}
