/* eslint-disable import/order */
import styled from 'styled-components';

import { ko } from 'date-fns/esm/locale';

import ReactDatePicker from 'react-datepicker';
import useOrdersStore from '../hooks/useOrdersStore';

import 'react-datepicker/dist/react-datepicker.css';

import numberFormat from '../utils/NumberFormat';

import { useEffect } from 'react';

import PageNumbers from './PageNumbers';
import { useLocalStorage } from 'usehooks-ts';

const Container = styled.div`
`;

const List = styled.ul`
  li {
    margin-block: .5em;
    padding: 1em;
    border: 1px solid black;
  }
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

  return (
    <Container>
      <div>
        <h3>주문 목록</h3>
        <div>
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
          <button
            type="button"
            onClick={handleSearchClick}
          >
            조회
          </button>
        </div>
        <List>
          {orders.map((order) => (
            <li key={order.id}>
              <div>
                <p>{order.createAt}</p>
                <button
                  type="button"
                  onClick={() => handleOrderClick(order.id)}
                >
                  주문 상세보기

                </button>
                <p>
                  {order.orderProducts[0].productName}
                  {' '}
                  외
                  {' '}
                  {order.orderProducts.length - 1}
                  건
                </p>
                <p>
                  {numberFormat(order.payment)}
                  원
                </p>
              </div>
            </li>
          ))}
        </List>
      </div>
      <PageNumbers
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
    </Container>
  );
}
