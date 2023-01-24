import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useOrderFormStore from '../hooks/useOrderFormStore';
import useOrderStore from '../hooks/useOrderStore';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding-inline: 15%;
  padding-top: 1.5em;
  font-size: 1.5em;

  h3 {
    font-weight: 400;
    font-size: .9em;
    margin-bottom: 3em;
  }

  div {
    font-size: .7em;
  }

  > p {
    font-weight: 700;
    margin-bottom: .5em;
  }

  div p:first-child {
    font-weight: 500;
  }
`;

const HomeButton = styled.button`
  margin-top: 5em;
  border: none;
  width: 30%;
  padding-top: 1em;
  padding-bottom: 1em;
  cursor: pointer;
`;

const PaymentDate = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
  display: grid;
  grid-template-columns: 1fr 5fr;
  p {
    padding-right: .5em;
  }
`;

const OrderNumber = styled.div`
  padding-bottom: 1em;
  display: grid;
  grid-template-columns: 1fr 5fr;
  p {
    padding-right: .5em;
  }
`;

const ProductName = styled.div`
  padding-bottom: 1em;
  display: grid;
  grid-template-columns: 1fr 5fr;
  p {
    padding-right: .5em;
  }
`;

const Amount = styled.div`
  padding-bottom: 1em;
  display: flex;
  display: grid;
  grid-template-columns: 1fr 5fr;
  p {
    padding-right: .5em;
  } 
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function OrderSuccess() {
  const orderFormStore = useOrderFormStore();

  const location = useLocation();

  const navigate = useNavigate();

  const pgToken = location.search.split('=')[1];

  useEffect(() => {
    orderFormStore.fetchPayResult(pgToken);
  }, []);

  const { paymentResult } = orderFormStore;

  const orderStore = useOrderStore();

  useEffect(() => {
    orderStore.fetchOrder(paymentResult.partner_order_id);
  }, []);

  const handleClickHome = () => {
    navigate('/');
  };

  if (paymentResult === '잘못된 접근입니다') {
    navigate('/');
  }

  if (!paymentResult.amount) {
    return (
      <p>
        로딩중
      </p>
    );
  }

  return (
    <Container>
      <h3>주문/결제</h3>
      <p>주문이 정상적으로 완료되었습니다.</p>
      <PaymentDate>
        <p>결제일시</p>
        <p>{paymentResult.approved_at}</p>
      </PaymentDate>
      <OrderNumber>
        <p>주문번호</p>
        <p>{paymentResult.partner_order_id}</p>
      </OrderNumber>
      <ProductName>
        <p>상품명</p>
        <p>{paymentResult.item_code}</p>
      </ProductName>
      <Amount>
        <p>결제금액</p>
        <p>
          {numberFormat(paymentResult.amount.total)}
          원
        </p>
      </Amount>
      <Buttons>
        <HomeButton
          type="button"
          onClick={handleClickHome}
        >
          홈으로
        </HomeButton>
      </Buttons>
    </Container>
  );
}
