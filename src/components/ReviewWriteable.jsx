/* eslint-disable import/order */
import styled from 'styled-components';

import useOrdersStore from '../hooks/useOrdersStore';

import 'react-datepicker/dist/react-datepicker.css';
import { nanoid } from 'nanoid';

import { useEffect } from 'react';

import PageNumbers from './PageNumbers';
import { useLocalStorage } from 'usehooks-ts';
import useReviewFormStore from '../hooks/useReviewFormStore';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 1em;
`;

const List = styled.ul`
  li {
    margin-block: .5em;
    padding: 1em;
    border: 1px solid black;
  }
`;

export default function ReviewWriteable({ navigate }) {
  const [accessToken] = useLocalStorage('accessToken', '');

  const ordersStore = useOrdersStore();
  const reviewFormStore = useReviewFormStore();

  const {
    orders, totalPageCount, currentPage,
  } = ordersStore;

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }

    ordersStore.fetchOrders(currentPage);
  }, []);

  const handlePageClick = (page) => {
    ordersStore.changePage(page);
  };

  const handleReviewWriteClick = (product, order) => {
    navigate('/my/review/write', {
      state: { product, orderId: order.id },
    });

    reviewFormStore.initialize();
  };

  return (
    <Container>
      <div>
        <h3>리뷰 관리</h3>
        <Link to="/my/review/writeable">리뷰 작성</Link>
        <Link to="/my/reviews">작성한 리뷰</Link>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <List>
                {order.orderProducts.map((product) => (
                  <li key={nanoid()}>
                    <p>
                      {product.productName}
                      {' '}
                      -
                      {' '}
                      {product.productOption}
                      ,
                      {' '}
                      {product.productQuantity}
                      개
                    </p>
                    <p>
                      주문일:
                      {' '}
                      {order.createAt}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleReviewWriteClick(product, order)}
                    >
                      리뷰 작성
                    </button>
                  </li>
                ))}
              </List>
            </li>
          ))}
        </ul>
      </div>
      <PageNumbers
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
    </Container>
  );
}
