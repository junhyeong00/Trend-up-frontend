/* eslint-disable import/order */
import { useEffect } from 'react';

import styled from 'styled-components';

import useOrdersStore from '../hooks/useOrdersStore';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

import numberFormat from '../utils/NumberFormat';

import PageNumbers from './PageNumbers';
import { useLocalStorage } from 'usehooks-ts';

import defaultTheme from '../styles/DefaultTheme';

import arrow from '../images/arrow.png';

const Container = styled.div`
  padding: 1em;
`;

const List = styled.ul`
  li {
    margin-block: 1em 1.3em;
    border-top: 2px solid #000000;
    font-weight: bold;

    button {
      border: none;
      background: none;
      font-weight: bold;
      font-size: 1.1em;
      display: flex;
      align-items: center;
      gap: .5em;
    }

    > div {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #D9D9D9;
      padding-block: 1em;
      align-items: center;

      div {
        display: flex;
        align-items: center;
        font-weight: normal;
        gap: .3em;
      }
    }

    > p {
      padding-top: 1em;
    }
  }
`;

const Date = styled.p`
  font-size: 1.1em;
`;

const Search = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h3 {
    width: 6em;
  }

  input {
    width: 18em;
    padding: .7em;
  }

  button {
    width: 4em;
    margin-left: 1em;
    padding: .7em;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
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

const Empty = styled.p`
  padding-block: 1em;
`;

export default function My({ navigate }) {
  const [accessToken] = useLocalStorage('accessToken', '');

  const ordersStore = useOrdersStore();

  const {
    orders, dateRange, totalPageCount, currentPage,
  } = ordersStore;

  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }

    ordersStore.fetchOrders(currentPage);
  }, []);

  const handleSearchClick = () => {
    ordersStore.fetchOrders(currentPage);
  };

  const handlePageClick = (page) => {
    ordersStore.changePage(page);
  };

  const handleOrderClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const orderCountFormat = (number) => {
    if (number === 1) {
      return '';
    }

    return ` 외 ${number - 1}건`;
  };

  return (
    <Container>
      <div>
        <Search>
          <h3>주문 목록</h3>
          {/* <label
            htmlFor="input-keyword"
          >
            search
          </label>
          <input
            id="input-keyword"
            value={keyword}
            onChange={(e) => ordersStore.changeKeyword(e.target.value)}
          /> */}
          <div>
            <ReactDatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                ordersStore.setDateRange(update);
              }}
              // isClearable
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              placeholderText="기간 선택"
            />
          </div>
          <button
            type="button"
            onClick={handleSearchClick}
          >
            조회
          </button>
        </Search>
        {orders.length ? (
          <List>
            {orders.map((order) => (
              <li key={order.id}>
                <div>
                  <Date>{order.createAt}</Date>
                  <button
                    type="button"
                    onClick={() => handleOrderClick(order.id)}
                  >
                    주문 상세보기
                    <img src={arrow} alt=">" />
                  </button>
                </div>
                <p>{order.deliveryStatus}</p>
                <div>
                  <div>
                    <Image
                      src={order.orderProducts[0].productImage}
                      alt={order.orderProducts[0].productName}
                    />
                    <p>
                      {order.orderProducts[0].productName}
                      {orderCountFormat(order.orderProducts.length)}
                    </p>
                  </div>
                  <p>
                    {numberFormat(order.payment)}
                    원
                  </p>
                </div>
              </li>
            ))}
          </List>
        ) : <Empty>주문내역이 없습니다</Empty>}
      </div>
      <PageNumbers
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
    </Container>
  );
}
