import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';

import styled from 'styled-components';

import useOrderStore from '../hooks/useOrderStore';
import useReviewFormStore from '../hooks/useReviewFormStore';

import numberFormat from '../utils/NumberFormat';
import phoneNumberFormat from '../utils/PhoneNumberFormat';

import SecondaryButton from './ui/SecondaryButton';

import defaultTheme from '../styles/DefaultTheme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
`;

const List = styled.ul`
  li {
    margin-top: .8em;
    padding-bottom: .8em;
    border-bottom: 1px solid #D9D9D9;
    display: grid;
    grid-template-columns: 1fr 5fr 1fr 1fr;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      gap: .3em
    }

    button {
      margin: 0;
      border-radius: 4px;
      padding: 1em 1em;
    }
  }
`;

const Price = styled.p`
  text-align: end;
  padding-right: 2em;
  font-weight: bold;
`;

const ReceiverInformation = styled.div`
 h4 {
    border-bottom: 2px solid #000000;
    padding-block: 1.5em;
  }

  dl {
    display: grid;
    grid-template-columns: 1fr 5fr;
    row-gap: .7em;
    padding-block: 1.5em;
  }
`;

const PaymentInformation = styled.div`
  h4 {
    border-bottom: 2px solid #000000;
    padding-block: 1.5em;
  }

  dl {
    display: grid;
    grid-template-columns: 1fr 5fr;
    row-gap: .7em;
    padding-block: 1.5em;
  }
`;

const OrderProducts = styled.div`
  h4 {
    border-top: 2px solid #000000;
    border-bottom: 1px solid #D9D9D9;
    padding-block: 1em;
  }
`;

const Image = styled.img`
  width: 6em;
  height: 6em;
  margin-right: 1em;
  display: flex;
  align-items: center;
  border: 1px solid ${defaultTheme.colors.fourth};
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
      <OrderProducts>
        <h4>주문 상품</h4>
        <List>
          {products.map((product) => (
            <li key={nanoid()}>
              <Image src={product.productImage} alt={product.productName} />
              <div>
                <Link to={`/products/${product.productId}`}>
                  <p>
                    {product.productName}
                    {' '}
                    -
                    {' '}
                    {product.productOption}
                  </p>
                </Link>
                <p>
                  {product.productQuantity}
                  개
                </p>
              </div>
              <Price>
                {numberFormat(product.productPrice)}
                원
              </Price>
              {product.writable
                ? (
                  <SecondaryButton
                    type="button"
                    onClick={() => handleReviewWriteClick(product)}
                  >
                    리뷰 작성
                  </SecondaryButton>
                ) : null}
            </li>
          ))}
        </List>
      </OrderProducts>
      <ReceiverInformation>
        <h4>배송 정보</h4>
        <dl>
          <dt>받는 사람</dt>
          <dd>{order.receiver}</dd>
          <dt>연락처</dt>
          <dd>{phoneNumberFormat(order.phoneNumber)}</dd>
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
        </dl>
      </ReceiverInformation>
      <PaymentInformation>
        <h4>결제 정보</h4>
        <dl>
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
        </dl>
      </PaymentInformation>
    </Container>
  );
}
