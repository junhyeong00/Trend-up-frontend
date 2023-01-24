/* eslint-disable react/jsx-props-no-spreading */

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useOrderFormStore from '../hooks/useOrderFormStore';

import numberFormat from '../utils/NumberFormat';

import Postcode from './Postcode';
import Error from './ui/Error';
import PrimaryButton from './ui/PrimaryButton';
import useCartStore from '../hooks/useCartStore';
import Input from './ui/Input';
import OrderProducts from './OrderProducts';
import PaymentDetail from './PaymentDetail';

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 1em;

  label {
    display: none;
  }
`;

const Title = styled.h2`
  margin-bottom: 1em;
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  margin-bottom: 1em;
  padding: 1em;
  border-block: 1px solid #aeadad;

  div {
    margin-bottom: 1em;
  }

  > button {
      justify-self: center;
      margin-top: 1.2em;
      padding: 1.1em 8em;
  }
`;

// const PaymentDetail = styled.div`
//   border-top: 1px solid #aeadad;
//   padding-top: 1.3em;
// `;

const DeliveryRequest = styled.div`
  input {
    width: 99%;
  }
`;

const Inputs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 9em 1fr;
  margin-top: 2em;

  > div {
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr 2.5fr 1fr;
  }
`;

export default function Order({ orderProducts }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [, setCart] = useLocalStorage('cart', '{"items":[]}');

  const orderFormStore = useOrderFormStore();
  const cartStore = useCartStore();

  useEffect(() => {
    orderFormStore.setOrderProducts(orderProducts);
  }, []);

  const {
    totalPrice, payment, deliveryFee,
    errorMessage,
  } = orderFormStore;

  const onSubmit = async (data) => {
    const {
      receiver, phoneNumber, deliveryRequest,
    } = data;

    const kakaoPayUrl = await orderFormStore.order({
      receiver,
      phoneNumber,
      deliveryRequest,
    });

    if (!kakaoPayUrl) {
      return;
    }

    window.location.href = kakaoPayUrl;

    if (kakaoPayUrl) {
      cartStore.deleteOrderProducts(orderProducts);
      setCart(JSON.stringify(cartStore.cart));
    }
  };

  return (
    <Container>
      <Title>주문 / 결제</Title>
      <OrderProducts />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>배송지 정보</h3>
          <Inputs>
            <div>
              <p>받는 분 성함</p>
              <p>받는 분 번호</p>
              <p>배송지</p>
              <p>배송 요청 사항</p>
            </div>
            <div>
              <div>
                <label htmlFor="input-receiver">받는 분 성함</label>
                <Input
                  id="input-receiver"
                  error={errors.receiver}
                  {...register(
                    'receiver',
                    { required: { value: true, message: '받는 분 성함을 입력해주세요' } },
                  )}
                />
                <Error>{errors.receiver ? errors.receiver.message : null}</Error>
              </div>
              <div>
                <label htmlFor="input-phoneNumber">
                  받는 분 번호
                </label>
                <Input
                  id="input-phoneNumber"
                  error={errors.phoneNumber}
                  {...register(
                    'phoneNumber',
                    {
                      required: { value: true, message: '받는 분 번호를 입력해주세요' },
                      pattern: { value: /^01{1}[01]{1}[0-9]{7,8}$/, message: '번호를 다시 확인해주세요' },
                    },
                  )}
                />
                <Error>{errors.phoneNumber ? errors.phoneNumber.message : null}</Error>
              </div>
              <div>
                <Postcode
                  register={register}
                  errors={errors}
                />
              </div>
              <DeliveryRequest>
                <label
                  htmlFor="input-delivery-request"
                >
                  배송 요청 사항
                </label>
                <Input
                  id="input-delivery-request"
                  {...register('deliveryRequest')}
                />
              </DeliveryRequest>
              <div />
            </div>
          </Inputs>
        </div>
        {/* <PaymentDetail>
          <h3>결제 상세</h3>
          <dl>
            <dt>결제금액</dt>
            <dd>
              {numberFormat(payment)}
              원
            </dd>
            <dt>상품금액</dt>
            <dd>
              {numberFormat(totalPrice)}
              원
            </dd>
            <dt>배송비</dt>
            <dd>
              {numberFormat(deliveryFee)}
              원
            </dd>
          </dl>
        </PaymentDetail> */}
        <PaymentDetail />
        <Error>{errorMessage}</Error>
        <PrimaryButton type="submit">
          결제하기
        </PrimaryButton>
      </Form>
    </Container>
  );
}
