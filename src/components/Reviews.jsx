import { useEffect } from 'react';

import styled from 'styled-components';

import StarRatings from 'react-star-ratings';
import PageNumbers from './PageNumbers';

import useReviewsStore from '../hooks/useReviewsStore';

const Container = styled.div`
  padding: 1em;
`;

const List = styled.ul`
  li {
    padding: 1em;
    border: 1px solid black;
  }

  button {
    padding: 1em;
  }
`;

const Content = styled.div`
  display: grid;

`;

const ReviewsInformation = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 2em;
  padding-top: 2em;
  padding-bottom: 1em;
`;

const TotalRating = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    padding-bottom: 1em;
  }
  p:first-child {
    color: #727272;
  }
  p:last-child {
    font-weight: bold;
    font-size: 2em;
  }
`;

const TotalReviews = styled.div`
   display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    padding-bottom: 1em;
  }
  p:first-child {
    color: #727272;
  }
  p:last-child {
    padding-top: .5em;
    font-weight: bold;
    font-size: 2em;
  }
`;

export default function Reviews({ productId }) {
  const reviewsStore = useReviewsStore();

  const {
    reviews, totalPageCount, totalReviewCount, totalRating,
  } = reviewsStore;

  const { currentPage } = reviewsStore;

  useEffect(() => {
    reviewsStore.fetchReviews(currentPage, productId);
  }, []);

  const handlePageClick = (page) => {
    reviewsStore.changePage(page);
  };

  if (!reviews.length) {
    return (<p>작성된 리뷰가 없습니다</p>);
  }

  return (
    <Container>
      <h3>상품 리뷰</h3>
      <ReviewsInformation>
        <TotalRating>
          <p>
            사용자 총 평점
          </p>
          <StarRatings
            rating={totalRating}
            starRatedColor="blue"
            starDimension="20px"
            starSpacing="3px"
          />
          <p>
            {totalRating}
            {' '}
            /
            {' '}
            5
          </p>
        </TotalRating>
        <TotalReviews>
          <p>
            전체 리뷰 수
          </p>
          <p>
            {totalReviewCount}
          </p>
        </TotalReviews>
      </ReviewsInformation>
      <List>
        {reviews.map((review) => (
          <li key={review.id}>
            <Content>
              <div>
                <StarRatings
                  rating={review.rating}
                  starRatedColor="blue"
                  starDimension="20px"
                  starSpacing="3px"
                />
                <p>{review.rating}</p>
              </div>
              <div>
                <p>{review.userName}</p>
                <p>{review.createAt}</p>
              </div>
              <div>
                <p>{review.productName}</p>
                <span>
                  -
                  {' '}
                  {review.productOption}
                </span>
              </div>
              <p>{review.content}</p>
            </Content>
            <img src={review.image} alt="" />
          </li>
        ))}
      </List>
      <PageNumbers
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
    </Container>
  );
}
