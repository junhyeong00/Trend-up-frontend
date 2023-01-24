/* eslint-disable react/jsx-props-no-spreading */

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { nanoid } from 'nanoid';

import numberFormat from '../utils/NumberFormat';
import optionPriceFormat from '../utils/OptionPriceFormat';

import defaultTheme from '../styles/DefaultTheme';
import useOrderFormStore from '../hooks/useOrderFormStore';

const Container = styled.div`
  margin-bottom: 6em;
  min-width: 980px;
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
    font-size: .9em;
    color: ${defaultTheme.colors.sixth};
  }
  tr {
    border-bottom: 1px solid ${defaultTheme.colors.fourth};
    font-size: 1.1em;
  }

  th:nth-child(1) {
    width: 50%;
  }
  td:nth-child(1) {
    text-align: left;
    position: relative;
  }
  th:nth-child(3) {
    width: 10%; 
  }
  td:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  th:nth-child(4) {
    width: 15%;
  }
  td {
    /* border-right: 1px solid ${defaultTheme.colors.fourth}; */
    height: 8em;
    div {
      display: flex;
      gap: .5em;
    }
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

const ProductInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .3em;
`;

export default function OrderProducts() {
  const orderFormStore = useOrderFormStore();

  const { orderProducts } = orderFormStore;

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>상품 정보</th>
            <th>옵션</th>
            <th>수량</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {orderProducts.map((item) => (
            <tr key={nanoid()}>
              <td>
                <div>
                  <Item to={`/products/${item.productId}`}>
                    <ImageContainer>
                      <img
                        src={item.image}
                        alt={item.name}
                        height={68}
                        width={68}
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
                </div>
              </td>
              <td>
                {item.optionName}
                {' '}
                {optionPriceFormat(item.optionPrice)}
              </td>
              <td>
                <p>
                  {item.quantity}
                </p>
              </td>
              <td>
                {numberFormat((item.price + item.optionPrice) * item.quantity)}
                원
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
