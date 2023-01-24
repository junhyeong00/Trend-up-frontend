import { useEffect } from 'react';

import styled from 'styled-components';

import StarRatings from 'react-star-ratings';
import PageNumbers from './PageNumbers';

import useReviewsStore from '../hooks/useReviewsStore';

const Container = styled.div`
  margin: 0 auto 2.5em;
`;

const List = styled.ul`
  li {
    display: flex;
    flex-direction: column;
    gap: .6em;
    margin-bottom: .7em;
    padding: 1.1em 2.2em;
    background-color: #F8F8F8;
  }

  button {
    padding: 1em;
  }

  img {
    width: 8em;
    height: 8em;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 8fr 1fr;

  min-height: 4em;
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

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: .5em;
  font-weight: bold;
`;

const ReviewInformaion = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    gap: .6em;
  }

  div:first-child {
    gap: 1.4em;
  }
`;

export default function Reviews({ productId }) {
  const reviewsStore = useReviewsStore();

  const {
    reviews, totalPageCount, totalReviewCount, totalRating,
  } = reviewsStore;

  const { currentPage } = reviewsStore;

  useEffect(() => {
    reviewsStore.fetchProductReviews(currentPage, productId);
  }, []);

  const handlePageClick = (page) => {
    reviewsStore.changePage(page);
  };

  return (
    <Container
      id="reviews"
    >
      <h3>상품 리뷰</h3>
      <ReviewsInformation>
        <TotalRating>
          <p>
            사용자 총 평점
          </p>
          <StarRatings
            rating={totalRating}
            starRatedColor="#ffc501"
            starEmptyColor="#ffe899"
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
      {reviews.length ? (
        <>
          <List>
            {reviews.map((review) => (
              <li key={review.id}>
                <div>
                  <ReviewInformaion>
                    <div>
                      <p>{review.userName}</p>
                      <p>{review.createAt}</p>
                      <p>
                        {review.productName}
                        {' '}
                        -
                        {' '}
                        {review.productOption}
                      </p>
                    </div>
                    <Rating>
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="#ffc501"
                        starEmptyColor="#ffe899"
                        starDimension="18px"
                        starSpacing="2px"
                      />
                      <p>{review.rating}</p>
                    </Rating>
                  </ReviewInformaion>
                </div>
                <Content>
                  <pre>{review.content}</pre>
                  {review.image
                    ? <img src={review.image} alt="" /> : null }
                </Content>
              </li>
            ))}
          </List>
          <PageNumbers
            totalPageCount={totalPageCount}
            handlePageClick={handlePageClick}
          />
        </>
      ) : <p>작성된 리뷰가 없습니다</p>}
    </Container>
  );
}
