import { useEffect, useState } from 'react';

import styled from 'styled-components';

import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import PageNumbers from './PageNumbers';

import useReviewsStore from '../hooks/useReviewsStore';
import Modal from './Modal';

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

  img {
    background-size: contain;
    width: 9em;
    height: 9em;
  }
`;

const Content = styled.div`
  display: grid;
`;

export default function MyReviews({ navigate }) {
  const [modalOpen, setModalOpen] = useState(false);

  const reviewsStore = useReviewsStore();

  const {
    reviews, totalPageCount,
  } = reviewsStore;

  const { currentPage } = reviewsStore;

  useEffect(() => {
    reviewsStore.fetchMyReviews(currentPage);
  }, []);

  const handlePageClick = (page) => {
    reviewsStore.changePage(page);
  };

  const handleClickDelete = async (reviewId) => {
    setModalOpen(true);
    await reviewsStore.changeReviewId(reviewId);
  };

  const handleClickEdit = async (reviewId) => {
    navigate('/my/review/edit', {
      state: { reviewId },
    });
  };

  const handleReviewDelete = () => {
    const id = reviewsStore.delete();

    if (id) {
      setModalOpen(false);
    }
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  if (!reviews.length) {
    return (<p>작성된 리뷰가 없습니다</p>);
  }

  return (
    <Container>
      <h3>리뷰 관리</h3>
      <Link to="/my/review/writeable">리뷰 작성</Link>
      <Link to="/my/reviews">작성한 리뷰</Link>
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
            <div>
              <button
                type="button"
                onClick={() => handleClickEdit(review.id)}
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => handleClickDelete(review.id)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </List>
      <PageNumbers
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
      {modalOpen ? (
        <Modal
          titleMessage="삭제 시 복구나 재등록이 불가능합니다. 정말 삭제하시겠습니까?"
          firstButtonName="취소"
          firstHandleClick={handleCancelClick}
          secondButtonName="삭제"
          secondHandleClick={handleReviewDelete}
        />
      ) : null}
    </Container>
  );
}
