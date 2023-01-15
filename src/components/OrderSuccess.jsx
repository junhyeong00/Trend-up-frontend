import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useOrderFormStore from '../hooks/useOrderFormStore';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding-inline: 15%;
  padding-top: 3em;
  font-size: 1.5em;
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
  display: flex;
  p {
    padding-right: .5em;
  }
`;

const OrderNumber = styled.div`
  padding-bottom: 1em;
  display: flex;
  p {
    padding-right: .5em;
  }
`;

const ProductName = styled.div`
 padding-bottom: 1em;
  display: flex;
  p {
    padding-right: .5em;
  }
`;

const Amount = styled.div`
  padding-bottom: 1em;
  display: flex;
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

  const handleClickHome = () => {
    navigate('/');
  };

  if (!paymentResult.amount) {
    return <p>now loading</p>;
  }

  return (
    <Container>
      <p>결제가 정상적으로 완료되었습니다</p>
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
