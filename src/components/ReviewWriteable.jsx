/* eslint-disable import/order */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import PageNumbers from './PageNumbers';

import { useLocalStorage } from 'usehooks-ts';

import useOrdersStore from '../hooks/useOrdersStore';
import useReviewFormStore from '../hooks/useReviewFormStore';

import { nanoid } from 'nanoid';

import defaultTheme from '../styles/DefaultTheme';
import SecondaryButton from './ui/SecondaryButton';

const Container = styled.div`
  padding: 1em;
`;

const List = styled.ul`
  li {
    margin-block: .5em;
    padding: 1em;
    border-bottom: 1px solid #D9D9D9;
    display: grid;
    grid-template-columns: 1.2fr 6fr 1fr;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      gap: .5em;
    }
  }

  button {
    margin: 0;
    border-radius: 4px;
    padding: 1em 1em;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1.7px solid #000000;
  padding-bottom: 1em;

  a:first-child {
    width: 50%;
    border: 1px solid #17181B;
    background: #17181B;
    padding-block: .4em;
    text-align: center;
    color: #FFFFFF;
  }

  a:last-child {
    width: 50%;
    border: 1px solid #CCCCCC;
    padding-block: .4em;
    text-align: center;
    color: #808080;
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
        <Buttons>
          <Link to="/my/review/writeable">리뷰 작성</Link>
          <Link to="/my/reviews">작성한 리뷰</Link>
        </Buttons>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <List>
                {order.orderProducts
                  .filter((product) => product.writable)
                  .map((product) => (
                    <li key={nanoid()}>
                      <Image src={product.productImage} alt={product.productName} />
                      <div>
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
                      </div>
                      <SecondaryButton
                        type="button"
                        onClick={() => handleReviewWriteClick(product, order)}
                      >
                        리뷰 작성
                      </SecondaryButton>
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
