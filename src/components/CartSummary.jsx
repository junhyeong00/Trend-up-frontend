/* eslint-disable react/jsx-props-no-spreading */

import styled from 'styled-components';

import useCartStore from '../hooks/useCartStore';

import numberFormat from '../utils/NumberFormat';

import defaultTheme from '../styles/DefaultTheme';

const CartSum = styled.table`
  margin-top: 2em;
  width: 100%;
  border-top: 1px solid ${defaultTheme.colors.primary};
  border-bottom: 1px solid ${defaultTheme.colors.primary};
  thead {
    font-size: .8em;
    font-weight: 400;
    height: 2.7em;
    border-bottom: 1px solid ${defaultTheme.colors.fourth};
    display: flex;
    align-items: center;
    color: ${defaultTheme.colors.primary};
  }
  tbody {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 7em;
  }
  tr {
    vertical-align: middle;
  }
  td {
    text-align: center;
  }
  `;

const Sum = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin-right: 1em;
    color: ${defaultTheme.colors.primary};
  }
`;

const Price = styled.p`
  margin-bottom: .5em;
  font-size: 1.3em;
  font-weight: 700;
  color: ${defaultTheme.colors.primary};
`;

const Description = styled.p`
  font-size: .7em;
  font-weight: 300;
`;

export default function CartSummary() {
  const cartStore = useCartStore();

  const { items } = cartStore.cart;

  const selected = items.filter((i) => i.selected);

  const totalPrice = items.filter((i) => i.selected)
    .reduce((total, item) => {
      const price = (item.price + item.optionPrice) * item.quantity;
      return total + price;
    }, 0);

  const deliveryFee = (totalPrice >= 50000 || !selected.length) ? 0 : 3000;

  return (
    <CartSum>
      <thead>
        <tr>
          <th>{`총 주문 상품 ${selected.length}개`}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Sum>
              <div>
                <Price>
                  {`${numberFormat(totalPrice)}원`}
                </Price>
                <Description>상품금액</Description>
              </div>
              <>
                <div>+</div>
                <div>
                  <Price>
                    {`${numberFormat(deliveryFee)}원`}
                  </Price>
                  <Description>배송비</Description>
                </div>
              </>
              <>
                <div>=</div>
                <div>
                  <Price>
                    {`${numberFormat(totalPrice + deliveryFee)}원`}
                  </Price>
                  <Description>총 주문금액</Description>
                </div>
              </>
            </Sum>
          </td>
        </tr>
      </tbody>
    </CartSum>
  );
}
